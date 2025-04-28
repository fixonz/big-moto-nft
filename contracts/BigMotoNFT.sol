// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract BigMotoNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    // Constants
    uint256 public constant MAX_SUPPLY = 999;
    uint256 public constant WHITELIST_SUPPLY = 50;
    
    // Pricing
    uint256 public whitelistPriceETH = 0.005 ether;  // $9 in ETH
    uint256 public whitelistPriceBIG = 3.2 ether;    // $5 in BIG (using 18 decimals)
    uint256 public publicPriceETH = 0.00667 ether;   // $12 in ETH
    
    // BIG token contract
    IERC20 public bigToken;
    
    // Sale state
    enum SaleState { Paused, Whitelist, Public }
    SaleState public saleState = SaleState.Paused;
    
    // Whitelist tracking
    bytes32 public merkleRoot;
    mapping(address => uint256) public whitelistMinted;
    
    // Metadata
    string public baseURI;
    string public baseExtension = ".json";
    
    // Events
    event Minted(address indexed to, uint256 tokenId);
    event SaleStateChanged(SaleState newState);
    event PriceUpdated(string priceType, uint256 newPrice);
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _bigTokenAddress
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        baseURI = _initBaseURI;
        bigToken = IERC20(_bigTokenAddress);
    }
    
    // Mint functions
    function mintWithETH(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(saleState != SaleState.Paused, "Sale is paused");
        require(_mintAmount > 0, "Must mint at least 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY, "Would exceed max supply");
        
        uint256 mintPrice;
        
        if (saleState == SaleState.Whitelist) {
            require(isWhitelisted(msg.sender, new bytes32[](0)), "Not whitelisted");
            require(whitelistMinted[msg.sender] + _mintAmount <= 2, "Whitelist mint limit exceeded");
            require(supply + _mintAmount <= WHITELIST_SUPPLY, "Would exceed whitelist supply");
            mintPrice = whitelistPriceETH;
            whitelistMinted[msg.sender] += _mintAmount;
        } else {
            mintPrice = publicPriceETH;
        }
        
        require(msg.value >= mintPrice * _mintAmount, "Insufficient ETH sent");
        
        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
            emit Minted(msg.sender, supply + i);
        }
    }
    
    function mintWithBIG(uint256 _mintAmount) public {
        require(saleState == SaleState.Whitelist, "BIG payment only available during whitelist");
        require(isWhitelisted(msg.sender, new bytes32[](0)), "Not whitelisted");
        
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "Must mint at least 1 NFT");
        require(supply + _mintAmount <= WHITELIST_SUPPLY, "Would exceed whitelist supply");
        require(whitelistMinted[msg.sender] + _mintAmount <= 2, "Whitelist mint limit exceeded");
        
        uint256 bigAmount = whitelistPriceBIG * _mintAmount;
        require(bigToken.balanceOf(msg.sender) >= bigAmount, "Insufficient BIG balance");
        
        // Transfer BIG tokens from user to contract
        require(bigToken.transferFrom(msg.sender, address(this), bigAmount), "BIG transfer failed");
        
        whitelistMinted[msg.sender] += _mintAmount;
        
        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
            emit Minted(msg.sender, supply + i);
        }
    }
    
    // Whitelist verification
    function isWhitelisted(address _user, bytes32[] memory _merkleProof) public view returns (bool) {
        // If using merkle proof verification:
        if (_merkleProof.length > 0) {
            bytes32 leaf = keccak256(abi.encodePacked(_user));
            return MerkleProof.verify(_merkleProof, merkleRoot, leaf);
        }
        
        // For testing or if using direct whitelist:
        return whitelistMinted[_user] < 2;
    }
    
    // Admin functions
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
    
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }
    
    function setSaleState(SaleState _state) public onlyOwner {
        saleState = _state;
        emit SaleStateChanged(_state);
    }
    
    function setWhitelistPriceETH(uint256 _price) public onlyOwner {
        whitelistPriceETH = _price;
        emit PriceUpdated("whitelistETH", _price);
    }
    
    function setWhitelistPriceBIG(uint256 _price) public onlyOwner {
        whitelistPriceBIG = _price;
        emit PriceUpdated("whitelistBIG", _price);
    }
    
    function setPublicPriceETH(uint256 _price) public onlyOwner {
        publicPriceETH = _price;
        emit PriceUpdated("publicETH", _price);
    }
    
    function setBigTokenAddress(address _bigTokenAddress) public onlyOwner {
        bigToken = IERC20(_bigTokenAddress);
    }
    
    // Withdrawal functions
    function withdrawETH() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Transfer failed");
    }
    
    function withdrawBIG() public onlyOwner {
        uint256 balance = bigToken.balanceOf(address(this));
        require(balance > 0, "No BIG to withdraw");
        
        require(bigToken.transfer(owner(), balance), "BIG transfer failed");
    }
    
    function withdrawERC20(address _tokenContract) public onlyOwner {
        IERC20 tokenContract = IERC20(_tokenContract);
        uint256 balance = tokenContract.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        
        require(tokenContract.transfer(owner(), balance), "Token transfer failed");
    }
    
    // Metadata
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }
    
    // Reserve NFTs for team/giveaways
    function reserveNFTs(address _to, uint256 _mintAmount) public onlyOwner {
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "Must mint at least 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY, "Would exceed max supply");
        
        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(_to, supply + i);
            emit Minted(_to, supply + i);
        }
    }
    
    // Add addresses to whitelist directly (alternative to merkle proof)
    function addToWhitelist(address[] calldata _users) public onlyOwner {
        for (uint256 i = 0; i < _users.length; i++) {
            whitelistMinted[_users[i]] = 0;
        }
    }
}

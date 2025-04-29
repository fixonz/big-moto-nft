"use client"

import React from "react"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "../lib/utils"

interface PixelatedButtonProps {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "secondary"
  size?: "default" | "large"
  className?: string
  external?: boolean
  onClick?: () => void
}

export default function PixelatedButton({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  external = false,
  onClick,
}: PixelatedButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-['Press_Start_2P'] text-xs transition-transform hover:scale-105 active:scale-95"

  const variantStyles = {
    primary: "bg-[#ff00ff] text-white border-2 border-white",
    secondary: "bg-transparent text-[#00ffff] border-2 border-[#00ffff]",
  }

  const sizeStyles = {
    default: "px-4 py-2",
    large: "px-6 py-3",
  }

  const buttonStyles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  const content = (
    <>
      {children}
      {external && <ExternalLink size={14} className="ml-1" />}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={buttonStyles}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button className={buttonStyles} onClick={onClick}>
      {content}
    </button>
  )
}

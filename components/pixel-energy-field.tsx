"use client"
import React from "react";

interface PixelEnergyFieldProps {
  color: string;
}

export default function PixelEnergyField({ color }: PixelEnergyFieldProps) {
  return (
    <div 
      className="absolute inset-0 animate-pulse" 
      style={{
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`
      }}
    />
  )
}

import React from 'react'

interface OverlayWrapperProps {
    children: React.ReactNode;
    className?: string;
  }

export default function OverlayWrapper({ children, className }: OverlayWrapperProps) {

  return (
    <main className={`w-screen h-screen flex ${className}`}>
        {children}
    </main>
  )
}

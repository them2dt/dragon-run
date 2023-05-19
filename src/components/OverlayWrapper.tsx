import React from 'react'

interface OverlayWrapperProps {
    children: React.ReactNode;
  }

export default function OverlayWrapper({ children }: OverlayWrapperProps) {

  return (
    <main className='w-screen h-screen flex bg-gradient-to-b from-bg1 to-bg2 overflow-hidden'>
        {children}
    </main>
  )
}

import React from 'react';

interface GameNavBarProps {
  children?: React.ReactNode;
}

export default function GameNavBar({ children }: GameNavBarProps) {
  return (
    <nav>
      <div className="flex flex-row h-auto w-[100vw] text-center items-center">{children}</div>
    </nav>
  );
}

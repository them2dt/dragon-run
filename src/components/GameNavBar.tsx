import React from 'react';

interface GameNavBarProps {
  children?: React.ReactNode;
}

export default function GameNavBar({ children }: GameNavBarProps) {
  return (
    <nav>
      <div className="flex flex-row w-full justify-between items-center pt-3 pl-3 lg:pt-5 lg:pl-5">{children}</div>
    </nav>
  );
}

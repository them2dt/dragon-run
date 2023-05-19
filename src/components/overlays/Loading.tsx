import React from 'react';
import AnimatedButton from 'components/animated/AnimatedButton';

export default function Loading() {

  return (
    <div className="home">
      <div className="home-buttons">
        <AnimatedButton text='Loading...'/>
      </div>
    </div>
  );
}

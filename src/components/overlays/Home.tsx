import React from 'react';
import logo from '../../assets/logo.png';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from '@events-center';
import EventKeys from '@consts/EventKeys';

export default function Home() {

  return (
    <div className="home">
      <div className="home-title">
        <img src={logo} alt="logo" />
      </div>
      <div className="home-buttons">
        <AnimatedButton text='Play' onClick={() => eventsCenter.emit(EventKeys.GoToGame)}/>
      </div>
    </div>
  );
}

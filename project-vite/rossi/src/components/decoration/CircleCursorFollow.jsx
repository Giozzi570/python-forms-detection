import React, { use } from 'react';
import { useEffect } from 'react';
import './CircleCursorFollow.css'; // Ensure you have the appropriate CSS for styling
import Mate from "../../assets/Mate.png"
import { useState } from 'react';
const CircleCursorFollow = () => {
    useEffect(() => {
    const CircleFunction = () => {
      const circle = document.querySelector('.circle');
      window.addEventListener('mousemove', (e) => {
        circle.style.left = `${e.clientX}px`;
        circle.style.top = `${e.clientY}px`;
      });
    };
    CircleFunction();
});

  return (
    <div className="circle-cursor-follow bg-gradient-to-br from-gray-100 to-gray-300" id='circle-cursor-follow'>
      <div className="circle"></div>
    </div>
  );
};

export default CircleCursorFollow;

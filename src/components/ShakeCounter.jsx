import React, { useState, useEffect } from 'react';

const ShakeCounter = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!('Accelerometer' in window) && !('Gyroscope' in window)) {
      setError('This device does not support motion sensors.');
      return;
    }

    const handleMotion = (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;
      const shakeThreshold = 15;

      if (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold || Math.abs(z) > shakeThreshold) {
        setShakeCount((prevCount) => prevCount + 1);
        triggerShakeAnimation();
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  const triggerShakeAnimation = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
  };

  const resetCounter = () => {
    setShakeCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Shake Counter</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div
            className={`w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 transition-transform duration-300 ${shaking ? 'transform scale-125' : ''}`}
          >
            {shakeCount}
          </div>
          <button
            onClick={resetCounter}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Counter
          </button>
        </>
      )}
    </div>
  );
};

export default ShakeCounter;

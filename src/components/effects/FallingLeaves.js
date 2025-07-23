import React, { useEffect, useState } from 'react';

const FallingLeaves = ({ 
  numberOfLeaves = 30, 
  gravity = 0.1, 
  windForce = 0.02,
  leafSource = { x: 0, y: 0 },
  width = 0,
  height = 0,
  run = true 
}) => {
  const [leaves, setLeaves] = useState([]);

  // Leaf shapes and colors
  const leafTypes = [
    { shape: '🍃', color: '#228B22' },
    { shape: '🍂', color: '#8B4513' },
    { shape: '🌿', color: '#32CD32' },
    { shape: '🍁', color: '#FF6347' },
  ];

  useEffect(() => {
    if (!run || width === 0 || height === 0) {
      setLeaves([]);
      return;
    }

    const createLeaf = (index) => ({
      id: index,
      x: leafSource.x + (Math.random() - 0.5) * 60,
      y: leafSource.y - 10 + (Math.random() - 0.5) * 20, // Fix offset by subtracting 10px
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      size: Math.random() * 0.8 + 0.6,
      opacity: Math.random() * 0.8 + 0.4,
      leafType: leafTypes[Math.floor(Math.random() * leafTypes.length)],
      life: 1.0,
      decay: Math.random() * 0.015 + 0.01, // Faster decay to prevent accumulation
    });

    let animationFrame;
    
    const animate = () => {
      setLeaves(prevLeaves => {
        // Filter out leaves that are off-screen or faded, and limit total count
        let updatedLeaves = prevLeaves
          .map(leaf => {
            // Physics simulation
            const newVy = leaf.vy + gravity;
            const newVx = leaf.vx + (Math.random() - 0.5) * windForce;
            const newX = leaf.x + newVx;
            const newY = leaf.y + newVy;
            const newRotation = leaf.rotation + leaf.rotationSpeed;
            const newLife = leaf.life - leaf.decay;

            return {
              ...leaf,
              x: newX,
              y: newY,
              vx: newVx * 0.99, // Air resistance
              vy: newVy,
              rotation: newRotation,
              life: newLife,
              opacity: Math.min(leaf.opacity, newLife),
            };
          })
          .filter(leaf => 
            leaf.life > 0 && 
            leaf.y < height + 50 && 
            leaf.x > -50 && 
            leaf.x < width + 50
          );

        // Limit total leaves to prevent lag
        if (updatedLeaves.length > numberOfLeaves * 2) {
          updatedLeaves = updatedLeaves.slice(-numberOfLeaves);
        }

        return updatedLeaves;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [run, width, height, leafSource.x, leafSource.y, numberOfLeaves, gravity, windForce]);

  // Clear leaves when effect stops
  useEffect(() => {
    if (!run) {
      setLeaves([]);
    }
  }, [run]);

  // Add new leaves on mouse movement (throttled)
  useEffect(() => {
    if (!run) return;
    
    const addLeaves = () => {
      setLeaves(prevLeaves => {
        // Only add if we don't have too many leaves
        if (prevLeaves.length >= numberOfLeaves) return prevLeaves;
        
        const newLeaves = Array.from({ length: 2 }, (_, i) => ({
          id: Date.now() + Math.random() + i,
          x: leafSource.x + (Math.random() - 0.5) * 40,
          y: leafSource.y - 10 + (Math.random() - 0.5) * 10, // Fix offset
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 1 + 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 6,
          size: Math.random() * 0.8 + 0.6,
          opacity: Math.random() * 0.6 + 0.4,
          leafType: leafTypes[Math.floor(Math.random() * leafTypes.length)],
          life: 1.0,
          decay: Math.random() * 0.015 + 0.01,
        }));
        
        return [...prevLeaves, ...newLeaves];
      });
    };

    addLeaves();
  }, [leafSource.x, leafSource.y, run, numberOfLeaves]);

  if (!run || width === 0 || height === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          style={{
            position: 'absolute',
            left: leaf.x,
            top: leaf.y,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.size})`,
            opacity: leaf.opacity,
            fontSize: '20px',
            transition: 'none',
            userSelect: 'none',
            color: leaf.leafType.color,
          }}
        >
          {leaf.leafType.shape}
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
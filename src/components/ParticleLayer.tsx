import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Particle } from '../types';
import { Snowflake } from './Snowflake';
import { Balloon } from './Balloon';

interface ParticleLayerProps {
  particles: Particle[];
  onRemoveParticle: (id: string) => void;
}

export const ParticleLayer: React.FC<ParticleLayerProps> = ({ particles, onRemoveParticle }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      <AnimatePresence>
        {particles.map((particle) => {
          const isSnowflake = particle.type === 'snowflake';
          
          if (isSnowflake) {
            return (
              <motion.div
                key={particle.id}
                initial={{
                  x: 0,
                  y: -100,
                  opacity: 0,
                  rotate: 0,
                  left: `${particle.left}%`
                }}
                animate={{
                  y: '110vh',
                  opacity: [0, particle.opacity, particle.opacity, 0],
                  rotate: [0, 180, 360, 540],
                  // Multi-phase horizontal sway for dynamic wind resistance
                  x: [
                    0, 
                    particle.swayDistance, 
                    -particle.swayDistance * 0.7, 
                    particle.swayDistance * 0.4, 
                    -particle.swayDistance * 0.2
                  ],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: particle.speed,
                  ease: 'linear',
                  times: [0, 0.1, 0.9, 1] // Keep opacity full throughout fall, fade out at end
                }}
                onAnimationComplete={() => {
                  onRemoveParticle(particle.id);
                }}
                className="absolute"
              >
                <Snowflake size={particle.size} />
              </motion.div>
            );
          } else {
            // Balloon animations
            return (
              <motion.div
                key={particle.id}
                initial={{
                  x: 0,
                  y: '110vh',
                  opacity: 0,
                  rotate: 0,
                  left: `${particle.left}%`
                }}
                animate={{
                  y: -150,
                  opacity: [0, particle.opacity, particle.opacity, 0],
                  rotate: [-15, 15, -10, 10, 0],
                  // Natural balloon swaying horizontally in the rising warm air
                  x: [
                    0,
                    -particle.swayDistance,
                    particle.swayDistance,
                    -particle.swayDistance * 0.5,
                    0
                  ]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: particle.speed,
                  ease: 'easeOut',
                  times: [0, 0.08, 0.92, 1]
                }}
                onAnimationComplete={() => {
                  onRemoveParticle(particle.id);
                }}
                className="absolute"
              >
                <Balloon size={particle.size} color={particle.color || '#3b82f6'} />
              </motion.div>
            );
          }
        })}
      </AnimatePresence>
    </div>
  );
};

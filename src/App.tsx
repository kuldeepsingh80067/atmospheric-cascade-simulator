import { useState, useEffect, useRef, useCallback } from 'react';
import { Particle, ActiveEffect } from './types';
import { Dashboard } from './components/Dashboard';
import { ParticleLayer } from './components/ParticleLayer';

export default function App() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeEffect, setActiveEffect] = useState<ActiveEffect>('none');
  const [countdown, setCountdown] = useState<number>(0);
  
  // Track continuous spawn intervals/intervals using refs to avoid React re-render lag
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Array of premium majestic colors for balloons
  const BALLOON_COLORS = [
    '#dc2626', // Crimson Red
    '#2563eb', // Sapphire Blue
    '#16a34a', // Emerald Green
    '#db2777', // Deep Rose
    '#9333ea', // Royal Purple
    '#ea580c', // Dark Amber / Mandarin
    '#0d9488', // Teal Blue
  ];

  // Helper to generate a random string for particle IDs
  const generateId = () => Math.random().toString(36).substring(2, 11);

  // Stop all active intervals cleanly
  const clearSimulationIntervals = useCallback(() => {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  // Remove a completed particle by ID
  const handleRemoveParticle = useCallback((id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Trigger Snowflakes Sequence
  const triggerSnowflakes = useCallback(() => {
    // Clean slate prior to launching new simulation
    clearSimulationIntervals();
    setActiveEffect('snowflakes');
    setCountdown(5.0);

    // 1. Spawning Mechanics Loop (runs for 5 seconds)
    const startTime = Date.now();
    const duration = 5000; // 5 seconds active generation pool

    const spawnSnowflake = () => {
      const id = `snow-${generateId()}`;
      const newParticle: Particle = {
        id,
        type: 'snowflake',
        // Span across full responsive width with random placement
        left: Math.random() * 105 - 2.5, // slightly off-bounds for seamless edge coverage
        size: Math.floor(Math.random() * 9) + 20, // 20px - 28px represent pristine 'medium' sizes
        speed: Math.random() * 2 + 3.8, // 3.8s to 5.8s fall time
        swayDistance: Math.random() * 50 + 35, // Horizontal wind drift radius
        swayDuration: Math.random() * 2.5 + 2,
        opacity: Math.random() * 0.35 + 0.6, // Soft elegant opacity spectrum
        createdAt: Date.now()
      };
      setParticles((prev) => [...prev, newParticle]);
    };

    // Initial batch trigger for immediate visual punch upon click
    for (let i = 0; i < 4; i++) {
      spawnSnowflake();
    }

    // Spawn periodically
    spawnIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        // Spawn 1 to 2 snowflakes every tick to simulate dense cascade
        spawnSnowflake();
        if (Math.random() > 0.4) spawnSnowflake();
      } else {
        // Stop spawning once 5-second window is reached
        if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      }
    }, 110);

    // 2. Countdown ticks every 100ms
    const cdInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.1) {
          clearInterval(cdInterval);
          setActiveEffect('none');
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);

    countdownIntervalRef.current = cdInterval;
  }, [clearSimulationIntervals]);

  // Trigger Balloons Sequence
  const triggerBalloons = useCallback(() => {
    // Clean slate prior to launching new simulation
    clearSimulationIntervals();
    setActiveEffect('balloons');
    setCountdown(5.0);

    // 1. Spawning Mechanics Loop (runs for 5 seconds)
    const startTime = Date.now();
    const duration = 5000; // 5 seconds active generation pool

    const spawnBalloon = () => {
      const id = `balloon-${generateId()}`;
      const randomColor = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
      
      const newParticle: Particle = {
        id,
        type: 'balloon',
        // Place horizontally but reserve margins to avoid side clipping
        left: Math.random() * 84 + 8, // 8% - 92% screen bounds
        size: Math.floor(Math.random() * 11) + 36, // 36px - 46px width represent perfect 'medium' balloons
        speed: Math.random() * 2.2 + 4.2, // 4.2s to 6.4s rise duration
        swayDistance: Math.random() * 35 + 15, // Horizontal thermal sway
        swayDuration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.15 + 0.85, // Vibrant high-end opaque finish
        color: randomColor,
        createdAt: Date.now()
      };
      setParticles((prev) => [...prev, newParticle]);
    };

    // Initial batch trigger for immediate visual punch upon click
    for (let i = 0; i < 3; i++) {
      spawnBalloon();
    }

    // Spawn periodically
    spawnIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        spawnBalloon();
        if (Math.random() > 0.6) spawnBalloon();
      } else {
        // Stop spawning once 5-second window is reached
        if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      }
    }, 220); // slightly broader interval for balloons to prevent clutter

    // 2. Countdown ticks every 100ms
    const cdInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.1) {
          clearInterval(cdInterval);
          setActiveEffect('none');
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);

    countdownIntervalRef.current = cdInterval;
  }, [clearSimulationIntervals]);

  // Clean-up and Reset All
  const handleResetChamber = useCallback(() => {
    clearSimulationIntervals();
    setActiveEffect('none');
    setCountdown(0);
    setParticles([]);
  }, [clearSimulationIntervals]);

  // Clean up hooks on unmount
  useEffect(() => {
    return () => clearSimulationIntervals();
  }, [clearSimulationIntervals]);

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#080a0e] via-[#0e1117] to-[#0a0c10] overflow-hidden flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Visual background grid texture for precision formal look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b13_1px,transparent_1px),linear-gradient(to_bottom,#1e293b13_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle organic light beacons for depth */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[15%] w-[500px] h-[400px] bg-rose-950/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main visual simulator controller */}
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <Dashboard 
          activeEffect={activeEffect}
          countdown={countdown}
          particleCount={particles.length}
          onTriggerSnowflakes={triggerSnowflakes}
          onTriggerBalloons={triggerBalloons}
          onReset={handleResetChamber}
        />
      </div>

      {/* Visual rendering backdrop layer */}
      <ParticleLayer 
        particles={particles} 
        onRemoveParticle={handleRemoveParticle} 
      />

      {/* Precision Frame Accents */}
      <div className="fixed top-4 left-4 font-mono text-[9px] text-slate-600 uppercase tracking-widest hidden md:block">
        sys_status: alpha_active
      </div>
      <div className="fixed top-4 right-4 font-mono text-[9px] text-slate-600 uppercase tracking-widest hidden md:block">
        lat_coord: 37.7749° N
      </div>
      <div className="fixed bottom-4 left-4 font-mono text-[9px] text-slate-600 uppercase tracking-widest hidden md:block">
        viewport: full_grid
      </div>
      <div className="fixed bottom-4 right-4 font-mono text-[9px] text-slate-600 uppercase tracking-widest hidden md:block">
        physics_core: motion_react v12
      </div>
    </main>
  );
}

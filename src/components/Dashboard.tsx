import React from 'react';
import { 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Activity, 
  Timer, 
  Trash2, 
  RefreshCw,
  Compass
} from 'lucide-react';
import { ActiveEffect } from '../types';

interface DashboardProps {
  activeEffect: ActiveEffect;
  countdown: number; // 0 to 5 seconds
  particleCount: number;
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeEffect,
  countdown,
  particleCount,
  onTriggerSnowflakes,
  onTriggerBalloons,
  onReset
}) => {
  // Compute progress percentage
  const progressPercent = (countdown / 5) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      
      {/* Editorial Header */}
      <header className="text-center mb-10 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-xs text-cyan-400 font-mono tracking-wider uppercase mb-3">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>Gravity & Atmospheric Simulator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-light text-slate-100 tracking-tight leading-none mb-3">
          Kinetic Motion <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-amber-400">Simulator</span>
        </h1>
        <p className="text-slate-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Conduct premium real-time fluid dynamics and particle physics simulations in our modular virtual testing chamber.
        </p>
      </header>

      {/* Main Glassmorphic Control Deck */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-950/65 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Left Column: Primary Simulator Switches */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-lg font-display font-medium text-slate-200 mb-1 flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-slate-400" />
              Environmental Triggers
            </h2>
            <p className="text-xs text-slate-500 mb-6 font-mono uppercase tracking-wider">
              Initialize five-second particle event streams
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Snowflakes Simulation Trigger Button */}
              <button
                id="btn-snowflakes"
                onClick={onTriggerSnowflakes}
                disabled={activeEffect !== 'none'}
                className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 flex flex-col items-start text-left cursor-pointer ${
                  activeEffect === 'snowflakes'
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/30 border-slate-850 hover:bg-slate-900/60 hover:border-slate-700 hover:shadow-lg disabled:opacity-45 disabled:pointer-events-none'
                }`}
              >
                {/* Visual Accent Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
                
                <div className="p-2 bg-cyan-950/60 rounded-lg text-cyan-400 border border-cyan-900/60 mb-4 transition-transform group-hover:scale-105">
                  <CloudSnow className="w-6 h-6 animate-spin-slow" />
                </div>
                
                <h3 className="text-md font-semibold text-slate-200 mb-1">
                  Snowflakes
                </h3>
                <p className="text-xs text-slate-400 font-light leading-snug">
                  Unleash frozen, medium-sized crystal dynamics falling downward at natural gravity speed.
                </p>

                {activeEffect === 'snowflakes' && (
                  <div className="mt-4 w-full h-1 bg-cyan-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-100 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </button>

              {/* Balloons Simulation Trigger Button */}
              <button
                id="btn-balloons"
                onClick={onTriggerBalloons}
                disabled={activeEffect !== 'none'}
                className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 flex flex-col items-start text-left cursor-pointer ${
                  activeEffect === 'balloons'
                    ? 'bg-rose-950/30 border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.18)]'
                    : 'bg-slate-900/30 border-slate-850 hover:bg-slate-900/60 hover:border-slate-700 hover:shadow-lg disabled:opacity-45 disabled:pointer-events-none'
                }`}
              >
                {/* Visual Accent Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all" />
                
                <div className="p-2 bg-rose-950/60 rounded-lg text-rose-400 border border-rose-900/40 mb-4 transition-transform group-hover:scale-105">
                  {/* Custom mini balloon icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <ellipse cx="12" cy="10" rx="6" ry="8" />
                    <path d="M12 18 L12 22" stroke="currentColor" strokeWidth="2" />
                    <polygon points="10,18 14,18 12,16" />
                  </svg>
                </div>
                
                <h3 className="text-md font-semibold text-slate-200 mb-1">
                  Balloons
                </h3>
                <p className="text-xs text-slate-400 font-light leading-snug">
                  Launch helium-infused medium-sized spheres floating upward via buoyant thermal convection.
                </p>

                {activeEffect === 'balloons' && (
                  <div className="mt-4 w-full h-1 bg-rose-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 transition-all duration-100 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </button>

            </div>
          </div>

          {/* Reset Chamber button at base */}
          <div className="pt-4 border-t border-slate-900 flex justify-between items-center bg-slate-950/20 p-2 rounded-lg">
            <div>
              <p className="text-xs text-slate-400">Simulation Status</p>
              <p className="text-sm font-semibold font-mono text-slate-200">
                {activeEffect === 'none' ? 'Ready to Simulate' : `${activeEffect.toUpperCase()} IN PROGRESS`}
              </p>
            </div>
            <button
              id="btn-reset"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-xs font-medium text-slate-300 border border-slate-850 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Chamber
            </button>
          </div>
        </div>

        {/* Right Column: Lab Diagnostics Status & Environment Metrics */}
        <div className="md:col-span-5 bg-slate-950/80 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between border-b border-slate-900 pb-2">
              <span>Chamber Diagnostics</span>
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${activeEffect !== 'none' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                {activeEffect !== 'none' ? 'SIMULATING' : 'IDLE'}
              </span>
            </h3>

            {/* Simulated Live Gauges */}
            <div className="space-y-4">
              
              {/* Event Progress Counter */}
              <div id="gauge-cooldown" className="bg-slate-900/40 border border-slate-900 rounded-lg p-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1 font-sans font-medium text-slate-300">
                    <Timer className="w-3.5 h-3.5 text-cyan-400" />
                    Cascade Event Window
                  </span>
                  <span className="font-mono text-cyan-400">{countdown.toFixed(1)}s</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-100 ease-linear rounded-full ${
                      activeEffect === 'snowflakes' ? 'bg-cyan-400' : activeEffect === 'balloons' ? 'bg-rose-500' : 'bg-slate-700'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Particles Density */}
              <div id="gauge-[density-specifier-info]" className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/40 border border-slate-900 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">Object Count</span>
                  <span className="text-xl font-mono font-bold text-slate-100 mt-1 block">
                    {particleCount}
                  </span>
                </div>
                <div className="bg-slate-900/40 border border-slate-900 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">Dimensions</span>
                  <span className="text-sm font-sans font-semibold text-slate-300 mt-1 block">
                    {activeEffect === 'none' ? 'N/A' : 'Medium-Scale'}
                  </span>
                </div>
              </div>

              {/* Constant Environmental Variables readout */}
              <div className="space-y-2 bg-slate-900/10 p-3 border border-slate-900/60 rounded-lg">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2">Simulated Constant Forces</p>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-slate-500" />
                    Chamber Temp
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {activeEffect === 'snowflakes' ? '-5.2 °C' : activeEffect === 'balloons' ? '22.8 °C' : '15.0 °C'}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-slate-500" />
                    Wind Velocity
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {activeEffect === 'snowflakes' ? '3.8 km/h' : activeEffect === 'balloons' ? '1.2 km/h' : '0.0 km/h'}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7" className={activeEffect === 'snowflakes' ? "text-cyan-400/80" : ""} />
                    </svg>
                    Vertical Gravity
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {activeEffect === 'snowflakes' ? '+9.81 m/s²' : activeEffect === 'balloons' ? '-3.45 m/s²' : '0.00 m/s²'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-slate-900/60 text-[11px] text-slate-500 font-mono leading-relaxed mt-4">
            Physically modeled vectors calculations mapped dynamically inside the viewport grid canvas.
          </div>
        </div>

      </div>

      {/* Aesthetic Help Guide at the bottom */}
      <footer className="mt-8 text-center text-xs text-slate-500 font-light flex items-center gap-1 bg-slate-950/25 px-4 py-2 border border-slate-900 rounded-full">
        <span>Click either environmental switch to trigger an atmospheric simulation event.</span>
      </footer>

    </div>
  );
};

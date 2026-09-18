"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Play, RotateCcw, Activity, Users, Layers, Zap, Info, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { audioEngine } from "@/lib/audioEngine";

export const PhysiXProject: React.FC = () => {
  const project = portfolioData.projects.find((p) => p.id === "physix")!;

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  // Simulation Controls
  const [angleDeg, setAngleDeg] = useState<number>(45);
  const [velocity, setVelocity] = useState<number>(14);
  const [gravityScale, setGravityScale] = useState<number>(1.0);
  const [impactCount, setImpactCount] = useState<number>(0);

  // Calculated Kinematics
  const g = 9.8 * gravityScale;
  const angleRad = (angleDeg * Math.PI) / 180;
  const v0x = velocity * Math.cos(angleRad);
  const v0y = velocity * Math.sin(angleRad);
  const timeOfFlight = ((2 * v0y) / g).toFixed(2);
  const maxHeight = ((v0y * v0y) / (2 * g)).toFixed(1);
  const range = ((velocity * velocity * Math.sin(2 * angleRad)) / g).toFixed(1);

  const initPhysicsWorld = () => {
    if (!sceneRef.current) return;

    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      Matter.Composite.clear(engineRef.current!.world, false);
      Matter.Engine.clear(engineRef.current!);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      sceneRef.current.innerHTML = "";
    }

    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

    const engine = Engine.create();
    engine.gravity.y = gravityScale;
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth || 540;
    const height = 280;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "#080a0f",
        showVelocity: false,
      },
    });
    renderRef.current = render;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height - 10, width, 20, {
      isStatic: true,
      render: { fillStyle: "#161b22", strokeStyle: "rgba(255, 255, 255, 0.1)", lineWidth: 1 },
    });
    const leftWall = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width, height / 2, 20, height, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true, render: { visible: false } });

    // Target Pyramid
    const stackX = width - 110;
    const stackY = height - 40;
    const targets: Matter.Body[] = [];
    const rows = 4;
    const blockSize = 22;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= i; j++) {
        const x = stackX + (j - i / 2) * (blockSize + 4);
        const y = stackY - (rows - i) * (blockSize + 2);
        const block = Bodies.rectangle(x, y, blockSize, blockSize, {
          restitution: 0.6,
          friction: 0.1,
          render: {
            fillStyle: (i + j) % 2 === 0 ? "#10b981" : "#00f0ff",
            strokeStyle: "rgba(255,255,255,0.15)",
            lineWidth: 1,
          },
        });
        targets.push(block);
      }
    }

    // Launcher Base
    const launcherBase = Bodies.circle(40, height - 30, 16, {
      isStatic: true,
      render: { fillStyle: "#8b5cf6" },
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling, launcherBase, ...targets]);

    Events.on(engine, "collisionStart", (event) => {
      setImpactCount((prev) => prev + event.pairs.length);
    });

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
  };

  useEffect(() => {
    initPhysicsWorld();

    return () => {
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.gravity.y = gravityScale;
    }
  }, [gravityScale]);

  const handleLaunch = () => {
    audioEngine.playClickSound();
    if (!engineRef.current || !sceneRef.current) return;

    const { Bodies, Composite, Body } = Matter;
    const height = 280;

    const projectile = Bodies.circle(40, height - 35, 10, {
      restitution: 0.75,
      friction: 0.05,
      density: 0.04,
      render: {
        fillStyle: "#f59e0b",
        strokeStyle: "#ffffff",
        lineWidth: 2,
      },
    });

    Composite.add(engineRef.current.world, projectile);

    const impulseMag = velocity * 0.0028;
    const forceVector = {
      x: impulseMag * Math.cos(angleRad),
      y: -impulseMag * Math.sin(angleRad),
    };

    Body.applyForce(projectile, projectile.position, forceVector);
  };

  const handleResetLab = () => {
    audioEngine.playClickSound();
    setImpactCount(0);
    initPhysicsWorld();
  };

  return (
    <div id="physix-demo" className="rounded-3xl bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-12 border border-[#10b981]/30 shadow-2xl relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#10b981] animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#10b981]">
            College Group Project • Backend Management Co-Lead
          </span>
        </div>
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#00f0ff] text-black font-bold text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Launch PhysiX Live Lab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-10">
        {/* Story & Context */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              PhysiX
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#10b981] mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-base text-white/80 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Group Credit Callout */}
          <div className="p-6 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#10b981] uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Collegiate Team Collaboration:</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {project.story} Jeshurun co-managed backend integration and state coordination with one teammate.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Technologies Used:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Matter.js Physics Simulator */}
        <div className="lg:col-span-7 rounded-3xl bg-[#080a0f] border border-[#10b981]/30 p-6 sm:p-8 shadow-2xl flex flex-col">
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#10b981]" />
              <span>2D Kinematic Physics Engine</span>
            </div>
            <button
              onClick={handleResetLab}
              className="text-white/50 hover:text-white flex items-center gap-1.5 text-xs font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sandbox</span>
            </button>
          </div>

          {/* Canvas Mount */}
          <div
            ref={sceneRef}
            className="w-full h-[260px] bg-[#080a0f] rounded-2xl border border-white/10 overflow-hidden relative mb-5"
          />

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-xs font-medium">
            <div className="p-3.5 rounded-2xl bg-[#0d1117] border border-white/10">
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Angle (θ):</span>
                <span className="text-[#00f0ff] font-bold">{angleDeg}°</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d1117] border border-white/10">
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Velocity (v₀):</span>
                <span className="text-[#f59e0b] font-bold">{velocity} m/s</span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d1117] border border-white/10">
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Gravity (g):</span>
                <span className="text-[#10b981] font-bold">{gravityScale.toFixed(1)}g</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={gravityScale}
                onChange={(e) => setGravityScale(Number(e.target.value))}
                className="w-full accent-[#10b981] cursor-pointer"
              />
            </div>
          </div>

          {/* Kinematic Telemetry */}
          <div className="p-3.5 rounded-2xl bg-[#0d1117] border border-white/10 text-xs grid grid-cols-3 text-center gap-2 mb-5">
            <div>
              <span className="text-white/40 block text-[11px]">Flight Time:</span>
              <span className="text-[#00f0ff] font-bold">{timeOfFlight}s</span>
            </div>
            <div>
              <span className="text-white/40 block text-[11px]">Max Height:</span>
              <span className="text-[#f59e0b] font-bold">{maxHeight}m</span>
            </div>
            <div>
              <span className="text-white/40 block text-[11px]">Range:</span>
              <span className="text-[#10b981] font-bold">{range}m</span>
            </div>
          </div>

          {/* Launch Trigger */}
          <button
            onClick={handleLaunch}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#00f0ff] text-black font-bold text-sm hover:opacity-90 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Physics Projectile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

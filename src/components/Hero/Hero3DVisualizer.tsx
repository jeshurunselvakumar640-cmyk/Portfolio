"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { audioEngine } from "@/lib/audioEngine";

export const Hero3DVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    try {
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 300;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.5;

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      setHasWebGL(false);
      return;
    }

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x00f0ff, 2.5, 50);
    light1.position.set(4, 4, 4);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 2.0, 50);
    light2.position.set(-4, -4, 4);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xf59e0b, 1.5, 50);
    light3.position.set(0, 4, -3);
    scene.add(light3);

    // 4. Floating Geometric Harmonic Objects
    const group = new THREE.Group();
    scene.add(group);

    // Outer Torus Ring
    const torusGeo = new THREE.TorusGeometry(2.4, 0.03, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00474f,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    group.add(torusMesh);

    // Secondary Intersecting Torus Ring
    const torusGeo2 = new THREE.TorusGeometry(2.0, 0.02, 16, 80);
    const torusMat2 = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    });
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusMesh2.rotation.y = Math.PI / 4;
    group.add(torusMesh2);

    // Core Wireframe Polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Central Glowing Crystal
    const crystalGeo = new THREE.OctahedronGeometry(0.7, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      emissive: 0xb45309,
      emissiveIntensity: 0.9,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    group.add(crystalMesh);

    // Mouse Move listener over window for 3D parallax tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseRef.current.targetX = x * 0.4;
      mouseRef.current.targetY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 5. Animation Loop
    let animId: number;
    const dataArray = new Uint8Array(64);
    let targetScale = 1;
    let currentScale = 1;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      group.rotation.y = mouseRef.current.x + performance.now() * 0.0004;
      group.rotation.x = -mouseRef.current.y + performance.now() * 0.0003;

      torusMesh.rotation.z += 0.004;
      torusMesh2.rotation.z -= 0.005;
      coreMesh.rotation.y += 0.006;
      crystalMesh.rotation.x -= 0.008;

      // Real audio reactivity
      audioEngine.getAnalyserData(dataArray);
      let sum = 0;
      for (let i = 0; i < 16; i++) {
        sum += dataArray[i];
      }
      const avg = sum / 16;
      targetScale = 1 + (avg / 255) * 0.6;
      currentScale += (targetScale - currentScale) * 0.12;

      coreMesh.scale.set(currentScale, currentScale, currentScale);
      crystalMesh.scale.set(currentScale * 1.1, currentScale * 1.1, currentScale * 1.1);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width > 0 && height > 0) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[260px]">
        <div className="relative w-48 h-48 rounded-full border border-[#00f0ff]/30 animate-spin flex items-center justify-center" style={{ animationDuration: "20s" }}>
          <div className="w-36 h-36 rounded-full border border-dashed border-[#8b5cf6]/40 animate-spin" style={{ animationDuration: "12s" }} />
          <div className="w-20 h-20 rounded-full bg-[#00f0ff]/10 blur-xl absolute" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-[280px] sm:h-[320px] relative flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
    </div>
  );
};

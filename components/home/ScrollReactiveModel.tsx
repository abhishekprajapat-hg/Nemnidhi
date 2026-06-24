"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry, Group, LineBasicMaterial, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ScrollTrigger } from "@/lib/gsap";

type ScrollReactiveModelProps = {
  className?: string;
  mode?: "hero" | "site";
};

export default function ScrollReactiveModel({ className, mode = "hero" }: ScrollReactiveModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const mountElement = mount;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let disposed = false;
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let model: Group | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let scrollProgress = 0;
    let targetProgress = 0;
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (edge0: number, edge1: number, value: number) => {
      const progress = clamp01((value - edge0) / (edge1 - edge0));
      return progress * progress * (3 - 2 * progress);
    };

    async function boot() {
      const THREE = await import("three");
      if (disposed) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 1.05, 10.6);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      Object.assign(renderer.domElement.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
      });
      mountElement.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0x67e8f9, 1.45);
      const key = new THREE.DirectionalLight(0xe9fdff, 5.8);
      const rim = new THREE.PointLight(0x67e8f9, 34, 26);
      const underGlow = new THREE.PointLight(0x22d3ee, 24, 18);
      key.position.set(3.8, 5.5, 5.8);
      rim.position.set(-3.6, 1.8, 3.8);
      underGlow.position.set(0, -2.6, 1.4);
      scene.add(ambient, key, rim, underGlow);

      model = new THREE.Group();
      model.position.set(mode === "site" ? 2.95 : 1.5, 0.02, 0);
      scene.add(model);

      const chipGroup = new THREE.Group();
      chipGroup.rotation.set(-0.42, -0.38, 0.08);
      model.add(chipGroup);
      const chipFleet: Array<{
        group: Group;
        origin: { x: number; y: number; z: number };
        pattern: { x: number; y: number; z: number };
        scale: number;
        phase: number;
      }> = [];
      const sidePixels: Mesh[] = [];
      const sidePixelOrigins: Array<{ x: number; y: number; z: number }> = [];
      const logoBarsMeshes: Mesh[] = [];
      const pinMeshes: Mesh[] = [];
      const pinOrigins: Array<{ x: number; y: number; z: number }> = [];
      const traceLines: Array<{ material: { opacity: number } }> = [];
      const nodeMeshes: Mesh[] = [];
      const patternConnectors: Array<{
        geometry: BufferGeometry;
        material: LineBasicMaterial;
        from: number;
        to: number;
      }> = [];

      const topMat = new THREE.MeshPhysicalMaterial({
        color: 0x123744,
        emissive: 0x062c38,
        emissiveIntensity: 0.55,
        metalness: 0.88,
        roughness: 0.34,
        clearcoat: 0.58,
        clearcoatRoughness: 0.36,
      });
      const sideMat = new THREE.MeshStandardMaterial({
        color: 0x1c6d7f,
        emissive: 0x0b3d4a,
        emissiveIntensity: 0.78,
        metalness: 0.42,
        roughness: 0.36,
      });
      const logoMat = new THREE.MeshStandardMaterial({
        color: 0xa5f3fc,
        emissive: 0x67e8f9,
        emissiveIntensity: 0.88,
        metalness: 0.52,
        roughness: 0.24,
      });
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.72,
      });
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0x67e8f9,
        emissive: 0x22d3ee,
        emissiveIntensity: 1.4,
        metalness: 0.7,
        roughness: 0.25,
      });
      const traceMat = new THREE.LineBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.58,
      });
      const faintTraceMat = new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.18,
      });

      const chipBody = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.72, 2.75, 8, 1, 8), sideMat);
      chipBody.castShadow = true;
      chipBody.receiveShadow = true;
      chipGroup.add(chipBody);

      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(3.86, 0.08, 2.8), topMat);
      topPlate.position.y = 0.4;
      chipGroup.add(topPlate);

      const bottomGlow = new THREE.Mesh(new THREE.BoxGeometry(3.72, 0.045, 2.62), glowMat);
      bottomGlow.position.y = -0.39;
      chipGroup.add(bottomGlow);

      const pixelGeo = new THREE.BoxGeometry(0.19, 0.28, 0.035);
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < 17; i++) {
          if ((i + side) % 4 === 0) continue;
          const pixel = new THREE.Mesh(pixelGeo, i % 3 === 0 ? glowMat : logoMat);
          pixel.position.set(-1.72 + i * 0.215, -0.08 + ((i % 2) * 0.09), side * 1.396);
          pixel.rotation.y = side > 0 ? 0 : Math.PI;
          sidePixels.push(pixel);
          sidePixelOrigins.push({ x: pixel.position.x, y: pixel.position.y, z: pixel.position.z });
          chipGroup.add(pixel);
        }
      }

      const sidePixelGeo = new THREE.BoxGeometry(0.035, 0.25, 0.18);
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < 12; i++) {
          if (i % 5 === 0) continue;
          const pixel = new THREE.Mesh(sidePixelGeo, i % 2 === 0 ? glowMat : logoMat);
          pixel.position.set(side * 1.935, -0.06 + ((i % 3) * 0.06), -1.1 + i * 0.2);
          sidePixels.push(pixel);
          sidePixelOrigins.push({ x: pixel.position.x, y: pixel.position.y, z: pixel.position.z });
          chipGroup.add(pixel);
        }
      }

      const logoBars = [
        [-0.48, 0, 0.68, 0.08],
        [-0.2, 0.22, 0.52, 0.08],
        [-0.18, -0.22, 0.52, 0.08],
        [0.24, 0, 0.76, 0.08],
        [0.52, 0.22, 0.48, 0.08],
        [0.52, -0.22, 0.48, 0.08],
      ];
      logoBars.forEach(([x, z, width, depth], index) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(width, 0.055, depth), logoMat);
        bar.position.set(x, 0.465, z);
        bar.rotation.y = index < 3 ? -0.18 : 0.18;
        logoBarsMeshes.push(bar);
        chipGroup.add(bar);
      });

      const pinGeo = new THREE.BoxGeometry(0.045, 0.055, 0.72);
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < 14; i++) {
          const pin = new THREE.Mesh(pinGeo, pinMat);
          pin.position.set(-1.58 + i * 0.245, -0.45, side * 1.72);
          pin.rotation.x = side * 0.08;
          pinMeshes.push(pin);
          pinOrigins.push({ x: pin.position.x, y: pin.position.y, z: pin.position.z });
          chipGroup.add(pin);
        }
      }

      [
        { x: -2.9, y: 1.05, z: 0.95, px: -1.5, py: 0.72, pz: 0.18, scale: 0.14, phase: 0 },
        { x: -0.45, y: -0.75, z: -1.25, px: -0.5, py: 0.72, pz: -0.05, scale: 0.13, phase: 0.58 },
        { x: 1.8, y: 1.24, z: 1.14, px: 0.5, py: 0.72, pz: 0.18, scale: 0.14, phase: 1.16 },
        { x: 3.05, y: -0.22, z: -0.72, px: 1.5, py: 0.72, pz: -0.05, scale: 0.13, phase: 1.74 },
        { x: -1.9, y: -0.18, z: -1.42, px: -1.5, py: 0, pz: -0.05, scale: 0.13, phase: 2.32 },
        { x: 0.05, y: 1.5, z: 1.34, px: -0.5, py: 0, pz: 0.18, scale: 0.145, phase: 2.9 },
        { x: 2.25, y: 0.36, z: -1.08, px: 0.5, py: 0, pz: -0.05, scale: 0.13, phase: 3.48 },
        { x: -3.28, y: -1.05, z: 1.2, px: 1.5, py: 0, pz: 0.18, scale: 0.14, phase: 4.06 },
        { x: -1.15, y: 1.78, z: -0.62, px: -1.5, py: -0.72, pz: 0.18, scale: 0.125, phase: 4.64 },
        { x: 0.85, y: -1.42, z: 1.42, px: -0.5, py: -0.72, pz: -0.05, scale: 0.135, phase: 5.22 },
        { x: 2.95, y: -1.05, z: 0.58, px: 0.5, py: -0.72, pz: 0.18, scale: 0.125, phase: 5.8 },
        { x: 3.55, y: 0.86, z: -1.55, px: 1.5, py: -0.72, pz: -0.05, scale: 0.135, phase: 6.38 },
      ].forEach((preset, index) => {
        const group = index === 0 ? chipGroup : chipGroup.clone(true);
        group.position.set(preset.x, preset.y, preset.z);
        group.scale.setScalar(preset.scale);
        group.rotation.set(-0.42 + preset.phase * 0.04, -0.38 + preset.phase * 0.18, 0.08 - preset.phase * 0.025);
        if (index > 0) model?.add(group);
        chipFleet.push({
          group,
          origin: { x: preset.x, y: preset.y, z: preset.z },
          pattern: { x: preset.px, y: preset.py, z: preset.pz },
          scale: preset.scale,
          phase: preset.phase,
        });
      });

      [
        [0, 1],
        [1, 2],
        [2, 3],
        [4, 5],
        [5, 6],
        [6, 7],
        [8, 9],
        [9, 10],
        [10, 11],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 8],
        [5, 9],
        [6, 10],
        [7, 11],
      ].forEach(([from, to]) => {
        const material = new THREE.LineBasicMaterial({
          color: 0x67e8f9,
          transparent: true,
          opacity: 0,
        });
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, 0),
        ]);
        patternConnectors.push({ geometry, material, from, to });
        model?.add(new THREE.Line(geometry, material));
      });

      const circuitGroup = new THREE.Group();
      circuitGroup.position.y = -1.22;
      circuitGroup.rotation.x = -Math.PI / 2;
      model.add(circuitGroup);

      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(11, 8),
        new THREE.MeshBasicMaterial({
          color: 0x050402,
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
        }),
      );
      circuitGroup.add(board);

      const makeTrace = (points: Array<[number, number]>, material = traceMat) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          points.map(([x, y]) => new THREE.Vector3(x, y, 0.015)),
        );
        traceLines.push({ material });
        circuitGroup.add(new THREE.Line(geometry, material));
      };

      const traceStarts = [-3.8, -3.1, -2.4, -1.7, 1.7, 2.4, 3.1, 3.8];
      traceStarts.forEach((x, index) => {
        const side = index < 4 ? -1 : 1;
        makeTrace([
          [x, side * 3.5],
          [x * 0.78, side * 2.25],
          [x * 0.5, side * 1.45],
          [x * 0.22, side * 0.78],
        ]);
      });

      for (let i = 0; i < 7; i++) {
        const offset = -3 + i;
        makeTrace(
          [
            [-5.2, offset],
            [-3.4, offset],
            [-2.8, offset + 0.36],
            [-1.4, offset + 0.36],
          ],
          i % 2 === 0 ? traceMat : faintTraceMat,
        );
        makeTrace(
          [
            [5.2, -offset],
            [3.4, -offset],
            [2.8, -offset - 0.36],
            [1.4, -offset - 0.36],
          ],
          i % 2 === 0 ? faintTraceMat : traceMat,
        );
      }

      const nodeGeo = new THREE.CircleGeometry(0.055, 18);
      for (let i = 0; i < 18; i++) {
        const node = new THREE.Mesh(nodeGeo, glowMat);
        node.position.set(Math.cos(i * 1.17) * 4.8, Math.sin(i * 0.83) * 3.2, 0.025);
        nodeMeshes.push(node);
        circuitGroup.add(node);
      }

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0,
      });
      const energyRings = [
        new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.015, 8, 128), ringMat),
        new THREE.Mesh(new THREE.TorusGeometry(4.05, 0.012, 8, 128), ringMat.clone()),
      ];
      energyRings[0].rotation.x = Math.PI / 2.15;
      energyRings[1].rotation.set(Math.PI / 2.5, 0.18, -0.08);
      energyRings.forEach((ring) => model?.add(ring));

      function resize() {
        if (!renderer || !camera) return;
        const width = Math.max(1, mountElement.clientWidth);
        const height = Math.max(1, mountElement.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      resize();
      window.addEventListener("resize", resize);

      if (!reducedMotion && mode === "hero") {
        scrollTrigger = ScrollTrigger.create({
          trigger: mountElement.closest("section") ?? mountElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetProgress = self.progress;
          },
        });
      }

      function render() {
        if (disposed || !renderer || !scene || !camera || !model) return;
        frameId = requestAnimationFrame(render);
        if (!reducedMotion && mode === "site") {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        }
        scrollProgress += (targetProgress - scrollProgress) * 0.08;

        const time = performance.now() * 0.001;
        const motion = reducedMotion ? 0 : scrollProgress;
        mountElement.dataset.motionProgress = motion.toFixed(3);
        const isMobile = window.innerWidth < 768;
        const siteDrift = mode === "site" ? Math.sin(motion * Math.PI * 2) : 0;
        const openStage = smoothstep(0.18, 0.5, motion);
        const transformStage = smoothstep(0.38, 0.72, motion);
        const destructureStage = smoothstep(0.12, 0.42, motion);
        const restructureStage = smoothstep(0.62, 0.9, motion);
        const chaosStage = destructureStage * (1 - restructureStage);
        const structureStage = 1 - chaosStage;
        const exitStage = smoothstep(0.72, 1, motion);
        const travelX = isMobile
          ? 1.25 - motion * 2.55
          : mode === "site"
            ? 2.65 - motion * 5.25
            : 2.4 - motion * 4.2;

        const driftingRotationX = -0.1 + motion * (mode === "site" ? 1.85 : 1.05) + Math.sin(time * 0.32) * 0.035;
        const driftingRotationY = -0.68 + motion * Math.PI * (mode === "site" ? 2.15 : 1.15) + Math.sin(time * 0.24) * 0.045;
        const driftingRotationZ = 0.08 - motion * (mode === "site" ? 0.95 : 0.42) + Math.sin(time * 0.2) * 0.02;
        model.rotation.x = driftingRotationX * chaosStage;
        model.rotation.y = driftingRotationY * chaosStage;
        model.rotation.z = driftingRotationZ * chaosStage;
        model.position.y = 0.05 + (mode === "site" ? siteDrift * 0.42 : motion * -0.85) + Math.sin(time * 0.5) * 0.09;
        model.position.x = travelX;
        model.position.z = mode === "site" ? Math.sin(motion * Math.PI) * 0.62 - exitStage * 0.25 : 0;
        model.scale.setScalar((mode === "site" ? (isMobile ? 0.82 : 0.92) : 0.92) + openStage * 0.02 - exitStage * 0.04);

        chipGroup.rotation.x = -0.42 + openStage * 0.24 + Math.sin(time * 0.55) * 0.018;
        chipGroup.rotation.z = 0.08 - transformStage * 0.22;
        chipBody.scale.y = 1 - openStage * 0.2;
        topPlate.position.y = 0.4 + openStage * 0.42 + Math.sin(time * 1.1) * 0.025 * openStage;
        bottomGlow.scale.set(1 + transformStage * 0.14, 1, 1 + transformStage * 0.14);
        glowMat.opacity = 0.52 + transformStage * 0.34 + Math.sin(time * 3) * 0.05;
        traceMat.opacity = 0.38 + transformStage * 0.42;
        faintTraceMat.opacity = 0.12 + transformStage * 0.24;
        rim.intensity = 24 + transformStage * 26 + Math.sin(time * 2.4) * 4;
        underGlow.intensity = 16 + openStage * 28;

        sidePixels.forEach((pixel, index) => {
          const origin = sidePixelOrigins[index];
          const directionZ = Math.sign(origin.z) || 1;
          const directionX = Math.sign(origin.x) || 1;
          pixel.position.set(
            origin.x + directionX * 0.08 * transformStage,
            origin.y + Math.sin(time * 2 + index) * 0.04 * openStage,
            origin.z + directionZ * 0.28 * openStage,
          );
          pixel.scale.setScalar(1 + transformStage * 0.18 + Math.sin(time * 3.2 + index) * 0.04 * openStage);
        });

        logoBarsMeshes.forEach((bar, index) => {
          bar.position.y = 0.465 + openStage * 0.48 + Math.sin(time * 1.2 + index) * 0.018 * openStage;
          bar.rotation.z = Math.sin(time + index) * 0.08 * transformStage;
        });

        pinMeshes.forEach((pin, index) => {
          const origin = pinOrigins[index];
          const directionZ = Math.sign(origin.z) || 1;
          pin.position.set(origin.x, origin.y - openStage * 0.08, origin.z + directionZ * (0.36 + transformStage * 0.28));
          pin.scale.z = 1 + transformStage * 0.38;
        });

        circuitGroup.rotation.z = motion * 0.28;
        circuitGroup.position.y = -1.22 - openStage * 0.16;
        traceLines.forEach((line, index) => {
          line.material.opacity += Math.sin(time * 2.2 + index) * 0.004 * transformStage;
        });
        nodeMeshes.forEach((node, index) => {
          node.scale.setScalar(1 + Math.sin(time * 2.8 + index) * 0.35 * transformStage);
        });
        energyRings.forEach((ring, index) => {
          const ringMaterial = ring.material as typeof ringMat;
          ringMaterial.opacity = Math.max(0, transformStage - exitStage * 0.65) * (index === 0 ? 0.5 : 0.32);
          ring.rotation.z = time * (0.18 + index * 0.08) + motion * Math.PI;
          ring.scale.setScalar(0.75 + transformStage * (0.35 + index * 0.18));
        });

        chipFleet.forEach((chip, index) => {
          const laneDrift = (index - 5.5) * chaosStage * 0.1;
          const float = Math.sin(time * 0.9 + chip.phase) * (0.07 + index * 0.006);
          const stagger = Math.sin(motion * Math.PI * 2 + chip.phase) * 0.18;
          const structurePulse = Math.sin(time * 1.5 + index) * 0.01 * structureStage;
          const chaosOrbit = Math.sin(time * 0.7 + chip.phase) * chaosStage * 0.16;
          const x = chip.pattern.x + (chip.origin.x - chip.pattern.x) * chaosStage;
          const y = chip.pattern.y + (chip.origin.y - chip.pattern.y) * chaosStage;
          const z = chip.pattern.z + (chip.origin.z - chip.pattern.z) * chaosStage;
          const frontRotationX = Math.PI / 2;
          const frontRotationY = 0;
          const frontRotationZ = 0;
          const chaosRotationX = -0.42 + chip.phase * 0.04;
          const chaosRotationY = -0.38 + chip.phase * 0.18;
          const chaosRotationZ = 0.08 - chip.phase * 0.025;

          chip.group.position.set(
            x + laneDrift,
            y + float * (0.12 + chaosStage * 0.88) + structurePulse,
            z + stagger * chaosStage + chaosOrbit,
          );
          chip.group.scale.setScalar(
            chip.scale * (1 + openStage * 0.05 + structureStage * 0.06 + chaosStage * 0.12 + Math.sin(time * 1.6 + chip.phase) * 0.018),
          );
          chip.group.rotation.set(
            frontRotationX + (chaosRotationX - frontRotationX) * chaosStage + Math.sin(time * 0.35 + chip.phase) * 0.012 * chaosStage,
            frontRotationY + (chaosRotationY - frontRotationY) * chaosStage + Math.sin(time * 0.42 + index) * 0.018 * chaosStage,
            frontRotationZ + (chaosRotationZ - frontRotationZ) * chaosStage + Math.sin(time * 0.28 + chip.phase) * 0.01 * chaosStage,
          );
        });

        patternConnectors.forEach((connector, index) => {
          const from = chipFleet[connector.from]?.group.position;
          const to = chipFleet[connector.to]?.group.position;
          if (!from || !to) return;

          connector.geometry.setFromPoints([
            new THREE.Vector3(from.x, from.y, from.z),
            new THREE.Vector3(to.x, to.y, to.z),
          ]);
          connector.material.opacity = structureStage * (0.3 + Math.sin(time * 2.4 + index) * 0.07);
        });

        camera.position.z = mode === "site" ? 10.9 - motion * 1.05 : 10.3 - motion * 0.9;
        camera.position.y = 1.05 + Math.sin(motion * Math.PI) * 0.35;
        camera.lookAt(0.05, -0.1, 0);
        renderer.render(scene, camera);
      }

      render();

      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    let removeResize: undefined | (() => void);
    boot()
      .then((cleanup) => {
        removeResize = cleanup;
      })
      .catch(console.error);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      scrollTrigger?.kill();
      removeResize?.();
      if (renderer) {
        renderer.dispose();
        const canvasParent = renderer.domElement.parentNode;
        if (canvasParent) {
          canvasParent.removeChild(renderer.domElement);
        }
      }
      if (model) {
        model.traverse((child) => {
          const mesh = child as Mesh;
          mesh.geometry?.dispose();
          const material = mesh.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material?.dispose();
        });
      }
    };
  }, [mode]);

  return <div ref={mountRef} className={className} aria-hidden="true" data-scroll-3d-model />;
}

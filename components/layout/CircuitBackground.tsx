"use client";

import { useEffect, useRef } from "react";
import type { Mesh, Vector3 } from "three";

// ── Three.js Circuit Board — Raven Trading style
// 3D chip on a PCB with glowing circuit traces and bloom post-processing.

export default function CircuitBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let animId = 0;
    let disposed = false;

    async function boot() {
      const THREE = await import("three");
      const { EffectComposer } = await import(
        "three/examples/jsm/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import(
        "three/examples/jsm/postprocessing/RenderPass.js"
      );
      const { UnrealBloomPass } = await import(
        "three/examples/jsm/postprocessing/UnrealBloomPass.js"
      );
      if (disposed) return;
      const mount = el;
      if (!mount) return;

      // ── RENDERER ────────────────────────────────────────────────
      const W = window.innerWidth;
      const H = window.innerHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.setClearColor(0x000000, 0);

      // style the canvas so it fills the fixed div
      Object.assign(renderer.domElement.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
      });
      mount.appendChild(renderer.domElement);

      // ── SCENE / CAMERA ──────────────────────────────────────────
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
      // Raven-like angle: centre-left, elevated, slight tilt
      camera.position.set(2, 14, 20);
      camera.lookAt(0, -1, 0);

      // ── LIGHTS ──────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x112233, 3));

      // Main point on the chip
      const chipPt = new THREE.PointLight(0x67e8f9, 25, 18, 1.5);
      chipPt.position.set(0, 3, 0);
      scene.add(chipPt);

      // Fill
      const fill = new THREE.PointLight(0x22d3ee, 10, 30, 1.2);
      fill.position.set(-8, 4, -4);
      scene.add(fill);

      // ── BOARD (PCB surface) ─────────────────────────────────────
      const boardGeo = new THREE.PlaneGeometry(50, 50);
      const boardMat = new THREE.MeshStandardMaterial({
        color: 0x040b0f,
        roughness: 0.95,
        metalness: 0.05,
      });
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.rotation.x = -Math.PI / 2;
      board.position.y = -0.12;
      scene.add(board);

      // ── CHIP GROUP ──────────────────────────────────────────────
      const chip = new THREE.Group();
      scene.add(chip);

      // Housing
      const houseMat = new THREE.MeshStandardMaterial({
        color: 0x0c141a,
        emissive: 0x091520,
        emissiveIntensity: 1,
        roughness: 0.25,
        metalness: 0.95,
      });
      chip.add(new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.22, 3.4), houseMat));

      // Die (glowing inner square)
      const dieMat = new THREE.MeshStandardMaterial({
        color: 0x052030,
        emissive: 0x67e8f9,
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.7,
      });
      chip.add(new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.26, 2.1), dieMat));

      // Die grid
      const gMat = new THREE.LineBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.5,
      });
      for (let i = -0.9; i <= 0.9; i += 0.3) {
        const h = [new THREE.Vector3(-1, 0.14, i), new THREE.Vector3(1, 0.14, i)];
        const v = [new THREE.Vector3(i, 0.14, -1), new THREE.Vector3(i, 0.14, 1)];
        chip.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(h), gMat));
        chip.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(v), gMat));
      }

      // Bright solder pads
      const padMat = new THREE.MeshStandardMaterial({
        color: 0xa5f3fc,
        emissive: 0x67e8f9,
        emissiveIntensity: 2,
        roughness: 0.05,
        metalness: 1,
      });
      const padGeo = new THREE.BoxGeometry(0.14, 0.06, 0.14);
      const sides = [
        // N pads (z = -1.7)
        ...[-0.9, -0.45, 0, 0.45, 0.9].map((x) => [x, 0.12, -1.7]),
        // S pads (z = +1.7)
        ...[-0.9, -0.45, 0, 0.45, 0.9].map((x) => [x, 0.12, 1.7]),
        // W pads (x = -1.7)
        ...[-0.9, -0.45, 0, 0.45, 0.9].map((z) => [-1.7, 0.12, z]),
        // E pads (x = +1.7)
        ...[-0.9, -0.45, 0, 0.45, 0.9].map((z) => [1.7, 0.12, z]),
      ];
      for (const [px, py, pz] of sides) {
        const pad = new THREE.Mesh(padGeo, padMat);
        pad.position.set(px, py, pz);
        chip.add(pad);
      }

      // ── PCB TRACES ──────────────────────────────────────────────
      const tMat = new THREE.LineBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.55,
      });

      type Trace = { pts: Vector3[]; len: number };
      const traces: Trace[] = [];

      // Generate traces from each pad outward with 90-degree routing
      const padDefs = [
        // N side → forward
        { sx: -0.9, sz: -1.7, dx: 0, dz: -1 },
        { sx: -0.45, sz: -1.7, dx: -1, dz: -1 },
        { sx: 0, sz: -1.7, dx: 0, dz: -1 },
        { sx: 0.45, sz: -1.7, dx: 1, dz: -1 },
        { sx: 0.9, sz: -1.7, dx: 0, dz: -1 },
        // S side → back
        { sx: -0.9, sz: 1.7, dx: 0, dz: 1 },
        { sx: -0.45, sz: 1.7, dx: -1, dz: 1 },
        { sx: 0, sz: 1.7, dx: 0, dz: 1 },
        { sx: 0.45, sz: 1.7, dx: 1, dz: 1 },
        { sx: 0.9, sz: 1.7, dx: 0, dz: 1 },
        // W side → left
        { sx: -1.7, sz: -0.9, dx: -1, dz: 0 },
        { sx: -1.7, sz: -0.45, dx: -1, dz: -1 },
        { sx: -1.7, sz: 0, dx: -1, dz: 0 },
        { sx: -1.7, sz: 0.45, dx: -1, dz: 1 },
        { sx: -1.7, sz: 0.9, dx: -1, dz: 0 },
        // E side → right
        { sx: 1.7, sz: -0.9, dx: 1, dz: 0 },
        { sx: 1.7, sz: -0.45, dx: 1, dz: -1 },
        { sx: 1.7, sz: 0, dx: 1, dz: 0 },
        { sx: 1.7, sz: 0.45, dx: 1, dz: 1 },
        { sx: 1.7, sz: 0.9, dx: 1, dz: 0 },
      ];

      for (const pd of padDefs) {
        const pts: Vector3[] = [];
        let cx = pd.sx;
        let cz = pd.sz;
        let dx = pd.dx;
        let dz = pd.dz;
        pts.push(new THREE.Vector3(cx, 0, cz));

        const segs = 3 + Math.floor(Math.random() * 3);
        let totalLen = 0;

        for (let s = 0; s < segs; s++) {
          const seg = 1.8 + Math.random() * 2.5;
          cx += dx * seg;
          cz += dz * seg;
          pts.push(new THREE.Vector3(cx, 0, cz));
          totalLen += seg;

          // 90° turn every other segment
          if (s % 2 === 0) {
            [dx, dz] = [-dz, dx];
          } else {
            [dx, dz] = [dz, -dx];
          }
        }

        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        scene.add(new THREE.Line(geo, tMat));
        traces.push({ pts, len: totalLen });
      }

      // ── PULSE PARTICLES ─────────────────────────────────────────
      type Pulse = { ti: number; t: number; speed: number; mesh: Mesh };
      const pulses: Pulse[] = [];
      const basePulseMat = new THREE.MeshBasicMaterial({ color: 0xe0fdff });
      const pulseGeo = new THREE.SphereGeometry(0.07, 8, 8);

      for (let i = 0; i < traces.length; i++) {
        const count = 1 + Math.floor(Math.random() * 2);
        for (let p = 0; p < count; p++) {
          const m = new THREE.Mesh(pulseGeo, basePulseMat.clone());
          scene.add(m);
          pulses.push({ ti: i, t: Math.random(), speed: 0.003 + Math.random() * 0.005, mesh: m });
        }
      }

      function sampleTrace(trace: Trace, t: number) {
        const { pts } = trace;
        const totLen = pts.reduce((a, _, i) => i === 0 ? a : a + pts[i].distanceTo(pts[i - 1]), 0);
        let rem = t * totLen;
        for (let i = 1; i < pts.length; i++) {
          const sl = pts[i].distanceTo(pts[i - 1]);
          if (rem <= sl) return pts[i - 1].clone().lerp(pts[i], rem / sl);
          rem -= sl;
        }
        return pts.at(-1)!.clone();
      }

      // ── BLOOM POST-PROCESS ───────────────────────────────────────
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 1.2, 0.4, 0.15);
      composer.addPass(bloom);

      // ── RESIZE ──────────────────────────────────────────────────
      function resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
      }
      window.addEventListener("resize", resize);

      // ── LOOP ─────────────────────────────────────────────────────
      let t = 0;
      function loop() {
        if (disposed) return;
        animId = requestAnimationFrame(loop);
        t += 0.006;

        // Chip float + pulse
        chip.position.y = Math.sin(t * 0.55) * 0.1;
        chip.rotation.y = Math.sin(t * 0.12) * 0.15;
        chipPt.intensity = 22 + Math.sin(t * 1.4) * 5;

        // Camera drift
        camera.position.x = 2 + Math.sin(t * 0.08) * 0.6;
        camera.position.y = 14 + Math.cos(t * 0.06) * 0.4;
        camera.lookAt(0, -1, 0);

        // Pulses
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          const pos = sampleTrace(traces[p.ti], p.t);
          p.mesh.position.set(pos.x, 0.1, pos.z);
        }

        composer.render();
      }
      loop();

      // cleanup
      (mount as typeof mount & { _dispose?: () => void })._dispose = () => {
        disposed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        renderer.dispose();
        composer.dispose();
        const canvasParent = renderer.domElement.parentNode;
        if (canvasParent) {
          canvasParent.removeChild(renderer.domElement);
        }
      };
    }

    boot().catch(console.error);

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      (el as typeof el & { _dispose?: () => void })._dispose?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}

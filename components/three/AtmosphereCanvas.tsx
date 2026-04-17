"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Floater = {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  speed: number;
  drift: number;
};

const PALETTE = ["#2E88FF", "#12CDAA", "#44D9FF", "#1A5BD1", "#EAF6FF"];

function createFloaters(
  sceneRoot: THREE.Group,
  geometries: THREE.BufferGeometry[],
  materials: THREE.Material[]
) {
  const floaters: Floater[] = [];
  const specs = [
    { size: 1.25, detail: 0, pos: [-3.8, 1.7, -3.8], speed: 0.6, drift: 0.35 },
    { size: 1, detail: 0, pos: [2.9, 2.1, -3.2], speed: 0.75, drift: 0.28 },
    { size: 0.92, detail: 0, pos: [4.1, -1.5, -4.3], speed: 0.55, drift: 0.32 },
    { size: 1.35, detail: 0, pos: [-2.1, -2.2, -3], speed: 0.64, drift: 0.25 },
    { size: 0.82, detail: 0, pos: [0, 2.9, -4], speed: 0.9, drift: 0.3 },
    { size: 0.75, detail: 0, pos: [0.9, -2.8, -3.6], speed: 0.8, drift: 0.24 },
  ];

  specs.forEach((spec, index) => {
    const geometry = new THREE.IcosahedronGeometry(spec.size, spec.detail);
    const material = new THREE.MeshStandardMaterial({
      color: PALETTE[index % PALETTE.length],
      metalness: 0.34,
      roughness: 0.14,
      transparent: true,
      opacity: 0.97,
      emissive: "#0A2A54",
      emissiveIntensity: 0.28,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    geometries.push(geometry);
    materials.push(material);
    sceneRoot.add(mesh);
    floaters.push({
      mesh,
      base: mesh.position.clone(),
      speed: spec.speed,
      drift: spec.drift,
    });
  });

  const ringGeometry = new THREE.TorusKnotGeometry(2.6, 0.2, 180, 18, 2, 5);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: "#39A5FF",
    emissive: "#104D9A",
    emissiveIntensity: 0.45,
    roughness: 0.22,
    metalness: 0.68,
    transparent: true,
    opacity: 0.74,
    wireframe: true,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.set(0.2, -0.15, -6.5);
  ring.rotation.set(0.45, 0.35, 0.2);
  sceneRoot.add(ring);
  geometries.push(ringGeometry);
  materials.push(ringMaterial);

  return { floaters, ring };
}

function createParticles(
  sceneRoot: THREE.Group,
  geometries: THREE.BufferGeometry[],
  materials: THREE.Material[],
  count: number
) {
  const buffer = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    buffer[i3] = (Math.random() - 0.5) * 22;
    buffer[i3 + 1] = (Math.random() - 0.5) * 14;
    buffer[i3 + 2] = -3 - Math.random() * 10;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(buffer, 3));
  const material = new THREE.PointsMaterial({
    color: "#7CC8FF",
    size: 0.09,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  sceneRoot.add(points);

  geometries.push(geometry);
  materials.push(material);

  return points;
}

export default function AtmosphereCanvas() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 900px)").matches;
    const lowMemory = (nav.deviceMemory ?? 8) <= 4;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lowPower = isSmallScreen || lowMemory || lowCores;
    const disableWebgl = reducedMotion || (isSmallScreen && (lowMemory || lowCores));

    // Keep CSS-based background glow but skip GPU scene on constrained devices.
    if (disableWebgl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
    camera.position.set(0, 0, 9.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPower,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.35));
    renderer.setClearColor(0x000000, 0);

    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.scale.set(1.1, 1.1, 1.1);
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(6, 7, 9);
    scene.add(keyLight);

    const coolLight = new THREE.PointLight("#2E88FF", 2.2, 28);
    coolLight.position.set(-7, 1.5, 8);
    scene.add(coolLight);

    const warmLight = new THREE.PointLight("#16D0AE", 1.95, 22);
    warmLight.position.set(8, -2.5, 7);
    scene.add(warmLight);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const { floaters, ring } = createFloaters(root, geometries, materials);
    const points = createParticles(root, geometries, materials, lowPower ? 180 : 360);

    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const frameBudget = 1000 / (lowPower ? 26 : 42);
    const enablePointerTilt = !lowPower;
    let lastFrame = 0;
    let frameId = 0;

    const resize = () => {
      const width = host.clientWidth || window.innerWidth;
      const height = host.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      pointer.x = ((event.clientX / width) * 2 - 1) * 0.28;
      pointer.y = ((event.clientY / height) * 2 - 1) * 0.2;
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      if (document.hidden) return;

      const now = performance.now();
      if (now - lastFrame < frameBudget) return;
      lastFrame = now;

      const t = clock.getElapsedTime();

      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, pointer.x, 0.04);
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -pointer.y, 0.035);

      floaters.forEach(({ mesh, base, speed, drift }, index) => {
        mesh.position.y = base.y + Math.sin(t * speed + index * 1.7) * drift;
        mesh.position.x = base.x + Math.cos(t * speed * 0.52 + index) * drift * 0.35;
        mesh.rotation.x += 0.0018 * speed;
        mesh.rotation.y += 0.0021 * speed;
      });

      ring.rotation.x += 0.0012;
      ring.rotation.y -= 0.0018;
      ring.rotation.z += 0.0015;

      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    resize();

    window.addEventListener("resize", resize, { passive: true });
    if (enablePointerTilt) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    renderer.render(scene, camera);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (enablePointerTilt) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      window.cancelAnimationFrame(frameId);

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      scene.clear();

      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="three-atmosphere" aria-hidden>
      <div ref={hostRef} className="three-atmosphere-canvas" />
    </div>
  );
}

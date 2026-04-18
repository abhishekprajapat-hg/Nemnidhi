"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type QuantumQubit = {
  node: THREE.Mesh;
  halo: THREE.Mesh;
  base: THREE.Vector3;
  phase: number;
  speed: number;
};

type QuantumRing = {
  mesh: THREE.Mesh;
  speed: number;
  phase: number;
  wobble: number;
};

type QuantumLink = {
  line: THREE.Line;
  a: QuantumQubit;
  b: QuantumQubit;
  phase: number;
  speed: number;
};

type QuantumPulse = {
  mesh: THREE.Mesh;
  radius: number;
  height: number;
  depthScale: number;
  phase: number;
  speed: number;
};

type QuantumCore = {
  group: THREE.Group;
  topPlate: THREE.Mesh;
  qubits: QuantumQubit[];
  rings: QuantumRing[];
  links: QuantumLink[];
  pulses: QuantumPulse[];
  dust: THREE.Points;
};

function trackMeshDisposables(mesh: THREE.Mesh, geometries: THREE.BufferGeometry[], materials: THREE.Material[]) {
  geometries.push(mesh.geometry);
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => materials.push(material));
  } else {
    materials.push(mesh.material);
  }
}

function trackLineDisposables(line: THREE.Line, geometries: THREE.BufferGeometry[], materials: THREE.Material[]) {
  geometries.push(line.geometry);
  if (Array.isArray(line.material)) {
    line.material.forEach((material) => materials.push(material));
  } else {
    materials.push(line.material);
  }
}

function setLineEndpoints(line: THREE.Line, a: THREE.Vector3, b: THREE.Vector3) {
  const positions = line.geometry.getAttribute("position");
  if (!(positions instanceof THREE.BufferAttribute)) return;

  positions.setXYZ(0, a.x, a.y, a.z);
  positions.setXYZ(1, b.x, b.y, b.z);
  positions.needsUpdate = true;
}

function createQuantumCore(
  sceneRoot: THREE.Group,
  geometries: THREE.BufferGeometry[],
  materials: THREE.Material[],
  lowPower: boolean
) {
  const group = new THREE.Group();
  group.position.set(0, 0, -2.6);
  sceneRoot.add(group);

  const chipBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.5, 3.2),
    new THREE.MeshPhysicalMaterial({
      color: "#102437",
      roughness: 0.42,
      metalness: 0.55,
      clearcoat: 0.36,
      clearcoatRoughness: 0.26,
      reflectivity: 0.8,
    })
  );
  chipBase.position.y = -0.35;
  group.add(chipBase);
  trackMeshDisposables(chipBase, geometries, materials);

  const topPlate = new THREE.Mesh(
    new THREE.BoxGeometry(2.42, 0.18, 2.42),
    new THREE.MeshStandardMaterial({
      color: "#1c3a57",
      emissive: "#2d9cff",
      emissiveIntensity: 0.6,
      roughness: 0.28,
      metalness: 0.5,
    })
  );
  topPlate.position.y = 0.05;
  group.add(topPlate);
  trackMeshDisposables(topPlate, geometries, materials);

  const pinMaterial = new THREE.MeshStandardMaterial({
    color: "#8ab5d8",
    emissive: "#193753",
    emissiveIntensity: 0.25,
    roughness: 0.4,
    metalness: 0.72,
  });
  materials.push(pinMaterial);

  const pinCount = lowPower ? 10 : 16;
  for (let i = 0; i < pinCount; i += 1) {
    const angle = (i / pinCount) * Math.PI * 2;
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.24, 6), pinMaterial);
    pin.position.set(Math.cos(angle) * 1.34, -0.04, Math.sin(angle) * 1.34);
    group.add(pin);
    geometries.push(pin.geometry);
  }

  const qubits: QuantumQubit[] = [];
  const qubitCount = lowPower ? 4 : 8;
  const qubitRadius = lowPower ? 2.28 : 2.62;
  const qubitSegments = lowPower ? 12 : 16;
  const haloSegments = lowPower ? 9 : 12;

  for (let i = 0; i < qubitCount; i += 1) {
    const layer = i % 2;
    const angle = (i / qubitCount) * Math.PI * 2;
    const y = layer === 0 ? 0.56 : -0.22;
    const x = Math.cos(angle) * qubitRadius;
    const z = Math.sin(angle) * qubitRadius * 0.74;
    const base = new THREE.Vector3(x, y, z);

    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, qubitSegments, qubitSegments),
      new THREE.MeshStandardMaterial({
        color: layer === 0 ? "#86d7ff" : "#5df6d5",
        emissive: layer === 0 ? "#3b86d6" : "#2aa58f",
        emissiveIntensity: 0.62,
        roughness: 0.25,
        metalness: 0.2,
      })
    );
    node.position.copy(base);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, haloSegments, haloSegments),
      new THREE.MeshBasicMaterial({
        color: layer === 0 ? "#7bc4ff" : "#64f6d8",
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      })
    );
    halo.position.copy(base);

    group.add(node);
    group.add(halo);
    trackMeshDisposables(node, geometries, materials);
    trackMeshDisposables(halo, geometries, materials);

    if (!lowPower || i % 2 === 0) {
      const conduit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x * 0.35, -0.08, z * 0.35),
          new THREE.Vector3(x, y, z),
        ]),
        new THREE.LineBasicMaterial({
          color: "#82bfff",
          transparent: true,
          opacity: 0.34,
        })
      );
      group.add(conduit);
      trackLineDisposables(conduit, geometries, materials);
    }

    qubits.push({
      node,
      halo,
      base,
      phase: (Math.PI * 2 * i) / Math.max(1, qubitCount),
      speed: 0.7 + Math.random() * 0.42,
    });
  }

  const links: QuantumLink[] = [];
  const linkMaterial = new THREE.LineBasicMaterial({
    color: "#94ccff",
    transparent: true,
    opacity: 0.2,
  });
  materials.push(linkMaterial);

  const addLink = (indexA: number, indexB: number, phase: number, speed: number) => {
    const a = qubits[indexA];
    const b = qubits[indexB];
    if (!a || !b) return;

    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([a.node.position.clone(), b.node.position.clone()]),
      linkMaterial
    );
    group.add(line);
    geometries.push(line.geometry);

    links.push({ line, a, b, phase, speed });
  };

  const stride = Math.floor(qubitCount / 2);
  for (let i = 0; i < qubitCount; i += 2) {
    const pair = (i + stride) % qubitCount;
    addLink(i, pair, i * 0.48, 1.15 + i * 0.05);
  }

  if (!lowPower && qubitCount >= 8) {
    for (let i = 0; i < qubitCount; i += 3) {
      const pair = (i + 3) % qubitCount;
      addLink(i, pair, i * 0.32 + 1.4, 1.45 + i * 0.04);
    }
  }

  const rings: QuantumRing[] = [];
  const ringSpecs = [
    { radius: 1.82, tube: 0.02, speed: 0.0044, phase: 0.2, wobble: 0.16, rot: new THREE.Euler(Math.PI / 2, 0, 0) },
    { radius: 2.12, tube: 0.018, speed: -0.0035, phase: 1.8, wobble: 0.13, rot: new THREE.Euler(0.38, 0.52, 0.24) },
    { radius: 2.36, tube: 0.016, speed: 0.0031, phase: 2.6, wobble: 0.11, rot: new THREE.Euler(-0.42, 0.2, -0.54) },
  ];

  ringSpecs.forEach((spec) => {
    if (lowPower && spec.radius > 2.2) return;

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(spec.radius, spec.tube, lowPower ? 8 : 12, lowPower ? 64 : 96),
      new THREE.MeshBasicMaterial({
        color: spec.radius > 2.1 ? "#56e2c8" : "#79c6ff",
        transparent: true,
        opacity: 0.36,
        blending: THREE.AdditiveBlending,
      })
    );

    ring.rotation.copy(spec.rot);
    group.add(ring);
    trackMeshDisposables(ring, geometries, materials);
    rings.push({
      mesh: ring,
      speed: spec.speed,
      phase: spec.phase,
      wobble: spec.wobble,
    });
  });

  const pulses: QuantumPulse[] = [];
  const pulseCount = lowPower ? 3 : 5;
  for (let i = 0; i < pulseCount; i += 1) {
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, lowPower ? 8 : 10, lowPower ? 8 : 10),
      new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? "#8dd5ff" : "#68f0d6",
        transparent: true,
        opacity: 0.9,
      })
    );

    group.add(pulse);
    trackMeshDisposables(pulse, geometries, materials);
    pulses.push({
      mesh: pulse,
      radius: 1.74 + (i % 3) * 0.3,
      height: (Math.random() - 0.5) * 0.66,
      depthScale: 0.65 + Math.random() * 0.24,
      phase: (Math.PI * 2 * i) / pulseCount,
      speed: 0.9 + Math.random() * 0.44,
    });
  }

  const dustCount = lowPower ? 70 : 160;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i += 1) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.7 + Math.random() * 4.2;
    const spread = (Math.random() - 0.5) * 2.8;
    dustPositions[i3] = Math.cos(angle) * radius;
    dustPositions[i3 + 1] = spread;
    dustPositions[i3 + 2] = Math.sin(angle) * radius * 0.8;
  }

  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  geometries.push(dustGeometry);

  const dustMaterial = new THREE.PointsMaterial({
    color: "#8acfff",
    size: 0.052,
    transparent: true,
    opacity: 0.48,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  materials.push(dustMaterial);

  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.position.y = 0.1;
  group.add(dust);

  return {
    group,
    topPlate,
    qubits,
    rings,
    links,
    pulses,
    dust,
  } satisfies QuantumCore;
}

export default function AtmosphereCanvas() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const deviceMemory = nav.deviceMemory ?? 8;
    const cpuCores = navigator.hardwareConcurrency ?? 8;
    const dpr = window.devicePixelRatio || 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;
    const lowMemory = deviceMemory <= 8;
    const veryLowMemory = deviceMemory <= 4;
    const lowCores = cpuCores <= 8;
    const veryLowCores = cpuCores <= 4;
    const lowPower = isSmallScreen || lowMemory || lowCores || dpr > 1.8;
    const disableWebgl = reducedMotion || isSmallScreen || veryLowMemory || veryLowCores;

    // Keep CSS background layers visible while skipping GPU work on constrained devices.
    if (disableWebgl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
    camera.position.set(0, 0.4, 10.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPower,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(dpr, lowPower ? 0.85 : 1));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xdceeff, 0.62);
    const hemi = new THREE.HemisphereLight(0xa9d7ff, 0x08131d, 0.82);
    const keyLight = new THREE.PointLight(0x8fd0ff, 1.35, 30, 2);
    keyLight.position.set(4.5, 4.3, 4.8);
    const accentLight = new THREE.PointLight(0x43e3c2, 1.15, 24, 2);
    accentLight.position.set(-4.8, -2.2, 3.5);
    scene.add(ambient, hemi, keyLight, accentLight);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const quantumCore = createQuantumCore(root, geometries, materials, lowPower);

    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const frameBudget = 1000 / (lowPower ? 24 : 32);
    const enablePointerTilt = !lowPower && window.matchMedia("(pointer: fine)").matches;
    let lastFrame = 0;
    let frameId = 0;
    let frameStep = 0;

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
      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, pointer.x + Math.sin(t * 0.12) * 0.08, 0.05);
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -pointer.y + Math.sin(t * 0.09) * 0.03, 0.045);

      quantumCore.group.position.y = Math.sin(t * 0.55) * 0.14;
      quantumCore.group.rotation.y += 0.0016;

      const topMaterial = quantumCore.topPlate.material;
      if (topMaterial instanceof THREE.MeshStandardMaterial) {
        topMaterial.emissiveIntensity = 0.56 + Math.sin(t * 2.1) * 0.2;
      }

      quantumCore.qubits.forEach((qubit) => {
        const wave = t * qubit.speed + qubit.phase;
        qubit.node.position.y = qubit.base.y + Math.sin(wave) * 0.12;
        qubit.node.position.x = qubit.base.x + Math.cos(wave * 0.48) * 0.09;
        qubit.node.position.z = qubit.base.z + Math.sin(wave * 0.62) * 0.08;

        const nodeScale = 1 + Math.sin(wave * 1.5) * 0.08;
        qubit.node.scale.setScalar(nodeScale);
        qubit.halo.position.copy(qubit.node.position);
        qubit.halo.scale.setScalar(1 + Math.sin(wave + 0.8) * 0.22);

        const haloMaterial = qubit.halo.material;
        if (haloMaterial instanceof THREE.MeshBasicMaterial) {
          haloMaterial.opacity = 0.11 + ((Math.sin(wave * 1.8) + 1) * 0.12);
        }
      });

      quantumCore.links.forEach((link) => {
        // On lower tiers, line endpoints update every other rendered frame.
        if (!lowPower || frameStep % 2 === 0) {
          setLineEndpoints(link.line, link.a.node.position, link.b.node.position);
        }
        const material = link.line.material;
        if (material instanceof THREE.LineBasicMaterial) {
          material.opacity = 0.12 + ((Math.sin(t * link.speed + link.phase) + 1) * 0.12);
        }
      });

      quantumCore.rings.forEach((ring) => {
        ring.mesh.rotation.y += ring.speed;
        ring.mesh.rotation.z = Math.sin(t * 0.52 + ring.phase) * ring.wobble;
      });

      quantumCore.pulses.forEach((pulse) => {
        const angle = t * pulse.speed + pulse.phase;
        pulse.mesh.position.set(
          Math.cos(angle) * pulse.radius,
          pulse.height + Math.sin(angle * 1.45) * 0.28,
          Math.sin(angle) * pulse.radius * pulse.depthScale
        );
      });

      quantumCore.dust.rotation.y += 0.0007;
      quantumCore.dust.rotation.x = Math.sin(t * 0.2) * 0.08;
      frameStep += 1;

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

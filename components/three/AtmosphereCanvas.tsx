"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CodeCard = {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  baseRotX: number;
  baseRotY: number;
  speed: number;
  drift: number;
  rollSpeed: number;
};

type SymbolNode = {
  sprite: THREE.Sprite;
  radius: number;
  speed: number;
  phase: number;
  yOffset: number;
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createCodeTexture(title: string, lines: string[], accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 460;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const width = canvas.width;
  const height = canvas.height;

  const panelGradient = ctx.createLinearGradient(0, 0, width, height);
  panelGradient.addColorStop(0, "rgba(10, 22, 36, 0.98)");
  panelGradient.addColorStop(1, "rgba(7, 14, 24, 0.98)");
  ctx.fillStyle = panelGradient;
  drawRoundedRect(ctx, 0, 0, width, height, 28);
  ctx.fill();

  ctx.strokeStyle = "rgba(110, 162, 219, 0.65)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 1.5, 1.5, width - 3, height - 3, 27);
  ctx.stroke();

  ctx.fillStyle = "rgba(26, 46, 73, 0.85)";
  ctx.fillRect(0, 0, width, 86);

  const dots = ["#ff6b6b", "#f5c15f", "#3dd598"];
  dots.forEach((dot, index) => {
    ctx.fillStyle = dot;
    ctx.beginPath();
    ctx.arc(40 + index * 26, 43, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.font = "700 30px 'JetBrains Mono', 'Consolas', monospace";
  ctx.fillStyle = "#DCEEFF";
  ctx.fillText(title, 130, 52);

  ctx.font = "600 26px 'JetBrains Mono', 'Consolas', monospace";
  lines.forEach((line, index) => {
    const y = 140 + index * 52;

    if (line.includes("const") || line.includes("function") || line.includes("return")) {
      const keyword = line.includes("const") ? "const" : line.includes("function") ? "function" : "return";
      const remainder = line.replace(keyword, "").trimStart();
      ctx.fillStyle = "#4EC6FF";
      ctx.fillText(keyword, 42, y);
      const keywordWidth = ctx.measureText(`${keyword} `).width;
      ctx.fillStyle = "#CDE6FF";
      ctx.fillText(remainder, 42 + keywordWidth, y);
    } else {
      ctx.fillStyle = index % 2 === 0 ? "#CDE6FF" : "#9BD8FF";
      ctx.fillText(line, 42, y);
    }
  });

  ctx.fillStyle = accent;
  ctx.fillRect(0, height - 8, width, 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createSymbolTexture(symbol: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 260;
  canvas.height = 260;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const radial = ctx.createRadialGradient(130, 130, 10, 130, 130, 130);
  radial.addColorStop(0, "rgba(19, 44, 74, 0.92)");
  radial.addColorStop(1, "rgba(8, 16, 26, 0.14)");

  ctx.fillStyle = radial;
  ctx.beginPath();
  ctx.arc(130, 130, 118, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(126, 188, 255, 0.58)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(130, 130, 116, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = "700 84px 'JetBrains Mono', 'Consolas', monospace";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, 130, 130);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createCodeCards(
  sceneRoot: THREE.Group,
  geometries: THREE.BufferGeometry[],
  materials: THREE.Material[],
  textures: THREE.Texture[],
  lowPower: boolean
) {
  const cards: CodeCard[] = [];
  const specs = [
    {
      title: "api/lease-automation.ts",
      lines: ["const pipeline = await crm.connect();", "pipeline.syncTenantRecords();", "return pipeline.deploy('secure');"],
      accent: "rgba(78, 198, 255, 0.9)",
      pos: [-4.1, 1.8, -4.4],
      speed: 0.58,
      drift: 0.36,
      rollSpeed: 0.0009,
    },
    {
      title: "security/audit-log.ts",
      lines: ["function verifyAccess(role, scope) {", "  if (!scope.allowed) throw new Error();", "  return audit.write(role, scope);"],
      accent: "rgba(61, 213, 152, 0.9)",
      pos: [3.9, 2.2, -4.0],
      speed: 0.66,
      drift: 0.31,
      rollSpeed: -0.001,
    },
    {
      title: "ops/dashboard-state.ts",
      lines: ["const kpi = metrics.computeQuarterly();", "kpi.riskIndex = model.forecast();", "publish(kpi, 'exec-command');"],
      accent: "rgba(141, 176, 255, 0.9)",
      pos: [4.6, -1.5, -5.2],
      speed: 0.53,
      drift: 0.33,
      rollSpeed: 0.0008,
    },
    {
      title: "crm/workflow-engine.ts",
      lines: ["const queue = await events.pull();", "queue.forEach(runWorkflowStep);", "commit('go-live-ready');"],
      accent: "rgba(118, 208, 255, 0.9)",
      pos: [-2.4, -2.4, -3.8],
      speed: 0.63,
      drift: 0.27,
      rollSpeed: -0.0011,
    },
    {
      title: "infra/replication.ts",
      lines: ["const mirror = vault.cloneRegion('ap-south');", "mirror.encryptAtRest();", "monitor.replicationHealth(mirror);"],
      accent: "rgba(56, 214, 193, 0.9)",
      pos: [0.2, 3.0, -4.8],
      speed: 0.74,
      drift: 0.29,
      rollSpeed: 0.0009,
    },
    {
      title: "deploy/pipeline.ts",
      lines: ["const release = ci.buildTaggedCommit();", "release.runSmokeSuite();", "release.promote('production');"],
      accent: "rgba(168, 204, 255, 0.9)",
      pos: [1.2, -2.9, -4.2],
      speed: 0.69,
      drift: 0.25,
      rollSpeed: -0.0009,
    },
  ];

  const limit = lowPower ? 3 : specs.length;

  specs.slice(0, limit).forEach((spec) => {
    const texture = createCodeTexture(spec.title, spec.lines, spec.accent);
    if (!texture) return;

    const geometry = new THREE.PlaneGeometry(3.0, 1.56);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const baseRotX = -0.1 + Math.random() * 0.14;
    const baseRotY = (Math.random() - 0.5) * 0.55;
    mesh.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
    mesh.rotation.set(baseRotX, baseRotY, 0);

    sceneRoot.add(mesh);

    cards.push({
      mesh,
      base: mesh.position.clone(),
      baseRotX,
      baseRotY,
      speed: spec.speed,
      drift: spec.drift,
      rollSpeed: spec.rollSpeed,
    });

    geometries.push(geometry);
    materials.push(material);
    textures.push(texture);
  });

  return cards;
}

function createSymbolNodes(
  sceneRoot: THREE.Group,
  materials: THREE.Material[],
  textures: THREE.Texture[],
  lowPower: boolean
) {
  const nodes: SymbolNode[] = [];
  const symbols = ["</>", "{}", "()=>", "npm", "git", "SQL"];
  const colors = ["#76D8FF", "#9BD4FF", "#50E0C7", "#BBD8FF", "#8BE5FF", "#7FC3FF"];
  const limit = lowPower ? 3 : symbols.length;

  for (let i = 0; i < limit; i += 1) {
    const texture = createSymbolTexture(symbols[i], colors[i % colors.length]);
    if (!texture) continue;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      opacity: 0.88,
    });

    const sprite = new THREE.Sprite(material);
    const size = 0.9 + Math.random() * 0.25;
    sprite.scale.set(size, size, 1);
    sceneRoot.add(sprite);

    nodes.push({
      sprite,
      radius: 2.8 + Math.random() * 2.1,
      speed: 0.2 + Math.random() * 0.2,
      phase: (Math.PI * 2 * i) / Math.max(1, limit),
      yOffset: (Math.random() - 0.5) * 2.4,
    });

    materials.push(material);
    textures.push(texture);
  }

  return nodes;
}

function createCodeParticles(
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
    size: 0.085,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.52,
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

    // Keep CSS fallback glow but skip GPU work on constrained devices.
    if (disableWebgl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
    camera.position.set(0, 0, 10.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPower,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.35));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const cards = createCodeCards(root, geometries, materials, textures, lowPower);
    const symbols = createSymbolNodes(root, materials, textures, lowPower);
    const particles = createCodeParticles(root, geometries, materials, lowPower ? 180 : 360);

    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const frameBudget = 1000 / (lowPower ? 24 : 40);
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
      pointer.x = ((event.clientX / width) * 2 - 1) * 0.24;
      pointer.y = ((event.clientY / height) * 2 - 1) * 0.18;
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

      cards.forEach((card, index) => {
        const wave = t * card.speed + index;
        card.mesh.position.y = card.base.y + Math.sin(wave) * card.drift;
        card.mesh.position.x = card.base.x + Math.cos(wave * 0.7) * card.drift * 0.34;
        card.mesh.rotation.x = card.baseRotX + Math.sin(wave * 0.5) * 0.05;
        card.mesh.rotation.y = card.baseRotY + Math.cos(wave * 0.4) * 0.08;
        card.mesh.rotation.z += card.rollSpeed;
      });

      symbols.forEach((node) => {
        const angle = t * node.speed + node.phase;
        node.sprite.position.x = Math.cos(angle) * node.radius;
        node.sprite.position.z = -2.4 + Math.sin(angle) * node.radius * 0.3;
        node.sprite.position.y = node.yOffset + Math.sin(angle * 1.6) * 0.34;
        node.sprite.material.rotation = Math.sin(t * 0.45 + node.phase) * 0.12;
      });

      particles.rotation.y += 0.0007;
      particles.rotation.x += 0.00025;

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
      textures.forEach((texture) => texture.dispose());

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

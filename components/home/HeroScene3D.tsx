"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CodePanel = {
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

function createPanelTexture(title: string, lines: string[], accent: string) {
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

function createCodePanels(
  sceneRoot: THREE.Group,
  geometries: THREE.BufferGeometry[],
  materials: THREE.Material[],
  textures: THREE.Texture[],
  lowPower: boolean
) {
  const panels: CodePanel[] = [];
  const specs = [
    {
      title: "src/runtime/api.ts",
      lines: ["const app = await bootstrap();", "app.attachWorkflowEngine();", "return app.deploy('production');"],
      accent: "rgba(78, 198, 255, 0.9)",
      pos: [-2.8, 1.2, -4.4],
      speed: 0.58,
      drift: 0.32,
      rollSpeed: 0.0009,
    },
    {
      title: "services/security.ts",
      lines: ["function verifyRole(user, scope) {", "  return access.guard(user, scope);", "}", "const vault = encryption.rotateKeys();"],
      accent: "rgba(61, 213, 152, 0.9)",
      pos: [0, -0.1, -3.2],
      speed: 0.67,
      drift: 0.28,
      rollSpeed: -0.0007,
    },
    {
      title: "ops/deploy.ts",
      lines: ["const release = pipeline.build();", "release.runSmokeSuite();", "release.promote('stable');"],
      accent: "rgba(141, 176, 255, 0.9)",
      pos: [2.9, 1.35, -4.6],
      speed: 0.54,
      drift: 0.31,
      rollSpeed: 0.0008,
    },
  ];

  const limit = lowPower ? 2 : specs.length;
  specs.slice(0, limit).forEach((spec) => {
    const texture = createPanelTexture(spec.title, spec.lines, spec.accent);
    if (!texture) return;

    const geometry = new THREE.PlaneGeometry(2.9, 1.58);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const baseRotX = -0.12 + Math.random() * 0.12;
    const baseRotY = (Math.random() - 0.5) * 0.45;
    mesh.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
    mesh.rotation.set(baseRotX, baseRotY, 0);

    sceneRoot.add(mesh);

    panels.push({
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

  return panels;
}

function createSymbolNodes(
  sceneRoot: THREE.Group,
  materials: THREE.Material[],
  textures: THREE.Texture[],
  lowPower: boolean
) {
  const nodes: SymbolNode[] = [];
  const symbols = ["</>", "{}", "()=>", "npm", "git"];
  const colors = ["#76D8FF", "#9BD4FF", "#50E0C7", "#BBD8FF", "#8BE5FF"];
  const limit = lowPower ? 3 : symbols.length;

  for (let i = 0; i < limit; i += 1) {
    const texture = createSymbolTexture(symbols[i], colors[i % colors.length]);
    if (!texture) continue;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      opacity: 0.86,
    });

    const sprite = new THREE.Sprite(material);
    const size = 0.72 + Math.random() * 0.25;
    sprite.scale.set(size, size, 1);
    sceneRoot.add(sprite);

    nodes.push({
      sprite,
      radius: 2.4 + Math.random() * 1.35,
      speed: 0.2 + Math.random() * 0.22,
      phase: (Math.PI * 2 * i) / Math.max(1, limit),
      yOffset: (Math.random() - 0.5) * 1.85,
    });

    materials.push(material);
    textures.push(texture);
  }

  return nodes;
}

function createParticles(
  sceneRoot: THREE.Group,
  geometries: THREE.BufferGeometry[],
  materials: THREE.Material[],
  count: number
) {
  const starsBuffer = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    starsBuffer[i3] = (Math.random() - 0.5) * 16;
    starsBuffer[i3 + 1] = (Math.random() - 0.5) * 9;
    starsBuffer[i3 + 2] = -2.8 - Math.random() * 8;
  }

  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsBuffer, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: "#8CCFFF",
    size: 0.06,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  sceneRoot.add(stars);
  geometries.push(starsGeometry);
  materials.push(starsMaterial);

  return stars;
}

export default function HeroScene3D() {
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

    if (disableWebgl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 90);
    camera.position.set(0, 0, 6.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPower,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.35));
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#B6DFFF", 1.25);
    key.position.set(4.6, 5.2, 6.6);
    scene.add(key);

    const cool = new THREE.PointLight("#2E88FF", 1.8, 24);
    cool.position.set(-4.5, 2.1, 5);
    scene.add(cool);

    const mint = new THREE.PointLight("#2ED7B8", 1.55, 20);
    mint.position.set(4.5, -2.2, 4.8);
    scene.add(mint);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const panels = createCodePanels(root, geometries, materials, textures, lowPower);
    const symbols = createSymbolNodes(root, materials, textures, lowPower);
    const stars = createParticles(root, geometries, materials, lowPower ? 120 : 220);

    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const frameBudget = 1000 / (lowPower ? 26 : 42);
    const enablePointerTilt = !lowPower;
    let lastFrame = 0;
    let isInView = true;
    let observer: IntersectionObserver | null = null;
    let frameId = 0;

    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;
      pointer.x = ((event.clientX - rect.left) / width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / height) * 2 - 1;
      pointer.x *= 0.26;
      pointer.y *= 0.2;
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      if (document.hidden || !isInView) return;

      const now = performance.now();
      if (now - lastFrame < frameBudget) return;
      lastFrame = now;

      const t = clock.getElapsedTime();

      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, pointer.x, 0.04);
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -pointer.y, 0.03);

      panels.forEach((panel, index) => {
        const wave = t * panel.speed + index;
        panel.mesh.position.y = panel.base.y + Math.sin(wave) * panel.drift;
        panel.mesh.position.x = panel.base.x + Math.cos(wave * 0.6) * panel.drift * 0.38;
        panel.mesh.rotation.x = panel.baseRotX + Math.sin(wave * 0.5) * 0.05;
        panel.mesh.rotation.y = panel.baseRotY + Math.cos(wave * 0.42) * 0.08;
        panel.mesh.rotation.z += panel.rollSpeed;
      });

      symbols.forEach((node) => {
        const angle = t * node.speed + node.phase;
        node.sprite.position.x = Math.cos(angle) * node.radius;
        node.sprite.position.z = -1.9 + Math.sin(angle) * node.radius * 0.25;
        node.sprite.position.y = node.yOffset + Math.sin(angle * 1.5) * 0.28;
        node.sprite.material.rotation = Math.sin(t * 0.45 + node.phase) * 0.11;
      });

      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.00035;

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (enablePointerTilt) {
      host.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          isInView = Boolean(entries[0]?.isIntersecting);
        },
        { threshold: 0.06 }
      );
      observer.observe(host);
    }
    renderer.render(scene, camera);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (enablePointerTilt) {
        host.removeEventListener("pointermove", onPointerMove);
      }
      observer?.disconnect();
      window.cancelAnimationFrame(frameId);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      scene.clear();

      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-3d-stage" aria-hidden>
      <div ref={hostRef} className="hero-3d-canvas" />
      <div className="hero-code-overlay">
        <p className="hero-code-title">runtime.snapshot</p>
        <p className="hero-code-line">
          <span className="hero-code-key">const</span> stack ={" "}
          <span className="hero-code-value">{`["Next.js", "Node.js", "MongoDB"]`}</span>;
        </p>
        <p className="hero-code-line">
          <span className="hero-code-key">p95 latency:</span> 42ms // production-safe
        </p>
        <p className="hero-code-line hero-code-cursor">$ ship --mode=production</p>
      </div>
    </div>
  );
}

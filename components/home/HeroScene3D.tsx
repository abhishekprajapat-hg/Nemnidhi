"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type OrbitToken = {
  sprite: THREE.Sprite;
  angleOffset: number;
  radius: number;
  speed: number;
  yOffset: number;
};

function createCodeTexture(label: string, accent: string) {
  const canvas = document.createElement("canvas");
  const width = Math.max(340, 160 + label.length * 16);
  const height = 100;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(11, 24, 40, 0.92)");
  gradient.addColorStop(1, "rgba(16, 36, 58, 0.84)");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(126, 184, 238, 0.65)";
  ctx.lineWidth = 2.2;

  const radius = 16;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(46, 215, 184, 0.2)";
  ctx.fillRect(16, 14, 10, 10);
  ctx.fillStyle = "rgba(46, 136, 255, 0.22)";
  ctx.fillRect(30, 14, 10, 10);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(44, 14, 10, 10);

  ctx.font = "600 34px 'DM Sans', 'Segoe UI', sans-serif";
  ctx.fillStyle = "#DDF0FF";
  ctx.fillText(label, 20, 70);

  ctx.font = "700 13px 'DM Sans', 'Segoe UI', sans-serif";
  ctx.fillStyle = accent;
  ctx.fillText("dev://runtime", width - 126, 24);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
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
    camera.position.set(0, 0, 6.4);

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

    const ambient = new THREE.AmbientLight(0xffffff, 0.92);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#B6DFFF", 1.55);
    key.position.set(4.8, 5.8, 7.2);
    scene.add(key);

    const cool = new THREE.PointLight("#2E88FF", 2.05, 26);
    cool.position.set(-5, 2, 5);
    scene.add(cool);

    const mint = new THREE.PointLight("#2ED7B8", 1.8, 22);
    mint.position.set(5, -2, 4);
    scene.add(mint);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const coreGeometry = new THREE.IcosahedronGeometry(1.03, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#5FAFFF",
      emissive: "#124A96",
      emissiveIntensity: 0.3,
      metalness: 0.42,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);
    geometries.push(coreGeometry);
    materials.push(coreMaterial);

    const ringGeometry = new THREE.TorusKnotGeometry(1.8, 0.15, 170, 24, 2, 3);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#35D4BA",
      emissive: "#127369",
      emissiveIntensity: 0.44,
      metalness: 0.56,
      roughness: 0.2,
      transparent: true,
      opacity: 0.78,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(0.7, 0.35, 0.2);
    root.add(ring);
    geometries.push(ringGeometry);
    materials.push(ringMaterial);

    const shellGeometry = new THREE.TorusGeometry(2.35, 0.05, 22, 190);
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: "#448FFF",
      emissive: "#1A5DB4",
      emissiveIntensity: 0.45,
      metalness: 0.42,
      roughness: 0.22,
      transparent: true,
      opacity: 0.42,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.rotation.set(1.18, 0.08, 0.36);
    root.add(shell);
    geometries.push(shellGeometry);
    materials.push(shellMaterial);

    const allCodeLabels = [
      "</>",
      "const scale = true;",
      "npm run build",
      "git push origin main",
      "{ api: 'stable' }",
      "deploy --prod",
    ];
    const allAccents = ["#5CC4FF", "#2ED7B8", "#7DB6FF", "#2ED7B8", "#A8CCFF", "#5CC4FF"];
    const labelLimit = lowPower ? 3 : allCodeLabels.length;
    const codeLabels = allCodeLabels.slice(0, labelLimit);
    const accents = allAccents.slice(0, labelLimit);

    const tokens: OrbitToken[] = [];
    codeLabels.forEach((label, index) => {
      const texture = createCodeTexture(label, accents[index % accents.length]);
      if (!texture) return;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(material);
      const scaleX = 1.72 + label.length * 0.028;
      sprite.scale.set(scaleX, scaleX * 0.3, 1);

      root.add(sprite);
      tokens.push({
        sprite,
        angleOffset: (Math.PI * 2 * index) / codeLabels.length,
        radius: 2.35 + Math.random() * 0.45,
        speed: 0.25 + Math.random() * 0.22,
        yOffset: (Math.random() - 0.5) * 1.2,
      });

      textures.push(texture);
      materials.push(material);
    });

    const starsCount = lowPower ? 110 : 220;
    const starsBuffer = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i += 1) {
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
    root.add(stars);
    geometries.push(starsGeometry);
    materials.push(starsMaterial);

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
      pointer.x *= 0.3;
      pointer.y *= 0.2;
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      if (document.hidden || !isInView) return;

      const now = performance.now();
      if (now - lastFrame < frameBudget) return;
      lastFrame = now;

      const t = clock.getElapsedTime();

      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, pointer.x, 0.035);
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -pointer.y, 0.03);

      core.rotation.x += 0.005;
      core.rotation.y += 0.007;

      ring.rotation.x += 0.003;
      ring.rotation.y += 0.005;
      ring.rotation.z += 0.002;

      shell.rotation.z += 0.0017;
      shell.rotation.y -= 0.0022;

      tokens.forEach((node, index) => {
        const angle = t * node.speed + node.angleOffset;
        node.sprite.position.x = Math.cos(angle) * node.radius;
        node.sprite.position.z = -0.12 + Math.sin(angle) * node.radius * 0.26;
        node.sprite.position.y = node.yOffset + Math.sin(angle * 1.45) * 0.34;
        node.sprite.material.rotation = Math.sin(t * 0.45 + index) * 0.08;
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
        <p className="hero-code-title">build.log</p>
        <p className="hero-code-line">
          <span className="hero-code-key">const</span> product ={" "}
          <span className="hero-code-value">&quot;Nemnidhi&quot;</span>;
        </p>
        <p className="hero-code-line">
          <span className="hero-code-key">status:</span> shipping scalable systems...
        </p>
        <p className="hero-code-line hero-code-cursor">$ npm run deploy</p>
      </div>
    </div>
  );
}

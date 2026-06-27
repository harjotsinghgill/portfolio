import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./GearDither.module.css";

// ─── Tweak everything here ────────────────────────────────────────────────
const CONFIG = {
  size: 1500, // canvas px (width = height)

  // Dither grid
  cell: 20, // px per cell — smaller = sharper, larger = coarser
  char: "*", // stamp character

  // Single base color — 4 intensity steps auto-generated
  baseColor: "#555",
  // Multiplies the opacity of each step — higher = punchier shadows (1.0 = subtle, 2.0 = full contrast)
  intensityScale: 1,
  // Gamma < 1 brightens — pushes near-lit faces to level 4, removes Bayer noise on flat surfaces
  gamma: 1,

  // Default 3-D tilt (degrees)
  tiltX: -25,
  tiltY: -25,

  // Spin & drag
  spinSpeed: 0.003, // rad/frame on Z
  dragSensitivity: 0.012, // rad/px

  // Gear material
  metalness: 0.4,
  roughness: 0.35,

  // Lights — low ambient keeps shadows dark, strong key = clear surface contrast
  ambientIntensity: 0.15,
  keyIntensity: 4.5,
  fillIntensity: 0.2,
} as const;
// ──────────────────────────────────────────────────────────────────────────

function makeShades(hex: string, scale: number): readonly string[] {
  // expand #rgb → #rrggbb
  const full =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  const r = parseInt(full.slice(1, 3), 16);
  const g = parseInt(full.slice(3, 5), 16);
  const b = parseInt(full.slice(5, 7), 16);
  return [0.28, 0.52, 0.76, 1.0]
    .map((a) => Math.min(a * scale, 1.0))
    .map((a) => `rgba(${r},${g},${b},${a.toFixed(2)})`);
}

const SHADES = makeShades(CONFIG.baseColor, CONFIG.intensityScale);

const BAYER: readonly number[][] = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const DEG = THREE.MathUtils.degToRad;

function getShade(value: number, threshold: number): string | null {
  const scaled = value * 4;
  const floor = Math.floor(scaled);
  const level = scaled - floor > threshold ? Math.min(floor + 1, 4) : floor;
  return level > 0 ? SHADES[level - 1] : null;
}

interface GearDitherProps {
  className?: string;
}

export function GearDither({ className = "" }: GearDitherProps) {
  const { size } = CONFIG;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const out = canvasRef.current;
    if (!out) return;
    const ctx = out.getContext("2d");
    if (!ctx) return;

    // drag state
    let dragActive = false;
    let lastDragX = 0;
    let lastDragY = 0;
    let velX = 0; // pitch (vertical drag → X rotation)
    let velY = 0; // yaw   (horizontal drag → Y rotation)
    const DRAG_SENS = 0.022;
    const DECAY = 0.95;

    const onDown = (e: PointerEvent) => {
      dragActive = true;
      lastDragX = e.clientX;
      lastDragY = e.clientY;
      velX = 0;
      velY = 0;
      out.setPointerCapture(e.pointerId);
      out.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragActive) return;
      velY += (e.clientX - lastDragX) * DRAG_SENS;
      velX += (e.clientY - lastDragY) * DRAG_SENS;
      lastDragX = e.clientX;
      lastDragY = e.clientY;
    };
    const onUp = () => {
      dragActive = false;
      out.style.cursor = "grab";
    };

    out.addEventListener("pointerdown", onDown);
    out.addEventListener("pointermove", onMove);
    out.addEventListener("pointerup", onUp);
    out.addEventListener("pointercancel", onUp);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(1);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, CONFIG.ambientIntensity));
    const key = new THREE.DirectionalLight(0xffffff, CONFIG.keyIntensity);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, CONFIG.fillIntensity);
    fill.position.set(-4, -2, 2);
    scene.add(fill);

    const pivot = new THREE.Group();
    pivot.rotation.x = DEG(CONFIG.tiltX);
    pivot.rotation.y = DEG(CONFIG.tiltY);
    scene.add(pivot);

    const readCanvas = document.createElement("canvas");
    readCanvas.width = size;
    readCanvas.height = size;
    const rctx = readCanvas.getContext("2d")!;

    const { cell, char } = CONFIG;
    const cells = Math.ceil(size / cell);

    ctx.font = `${cell + 1}px "Space Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let raf = 0;
    let disposed = false;
    let loaded = false;
    let angle = 0;

    new GLTFLoader().load("/simple_gear.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      model.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: CONFIG.metalness,
            roughness: CONFIG.roughness,
          });
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const viewHalfH = Math.tan((16 * Math.PI) / 180) * camera.position.z;
      const fit = (viewHalfH * 1.3) / (sphere.radius || 1);
      model.scale.setScalar(fit);
      model.rotation.x = Math.PI / 2;
      model.position.set(-fit * center.x, fit * center.z, -fit * center.y);
      pivot.add(model);
      loaded = true;
    });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!loaded) return;

      if (dragActive) {
        velX *= 0.78;
        velY *= 0.78;
      } else {
        velX *= DECAY;
        velY *= DECAY;
      }
      pivot.rotation.x += velX;
      pivot.rotation.y += velY;
      angle += CONFIG.spinSpeed;
      pivot.rotation.z = angle;
      renderer.render(scene, camera);

      rctx.clearRect(0, 0, size, size);
      rctx.drawImage(renderer.domElement, 0, 0);
      const { data } = rctx.getImageData(0, 0, size, size);

      ctx.clearRect(0, 0, size, size);

      for (let row = 0; row < cells; row++) {
        for (let col = 0; col < cells; col++) {
          const px = Math.floor(col * cell + cell / 2);
          const py = Math.floor(row * cell + cell / 2);
          const i = (py * size + px) * 4;
          const lum =
            (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          const raw = lum * (data[i + 3] / 255);
          const value = Math.pow(raw, CONFIG.gamma);
          const shade = getShade(value, BAYER[row % 4][col % 4] / 16);
          if (shade) {
            ctx.fillStyle = shade;
            ctx.fillText(char, px, py);
          }
        }
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      renderer.dispose();
      out.removeEventListener("pointerdown", onDown);
      out.removeEventListener("pointermove", onMove);
      out.removeEventListener("pointerup", onUp);
      out.removeEventListener("pointercancel", onUp);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
}

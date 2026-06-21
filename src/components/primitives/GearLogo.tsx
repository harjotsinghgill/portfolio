import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./Logo.module.css";

interface GearLogoProps {
  size?: number;
  src?: string;
  /** Override the gear colour (bypasses --accent). Update freely — triggers a material swap. */
  tint?: string;
  /** When true the gear always spins at full speed (for screensaver / decoration). */
  autoSpin?: boolean;
}

const REST_SPEED = 0.4;
const HOVER_SPEED = 4.5;

export function GearLogo({
  size = 80,
  src = "/simple_gear.glb",
  tint,
  autoSpin = false,
}: GearLogoProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Heavy setup — only reruns when size or src changes.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rawAccent =
      tint ? getComputedStyle(mount).getPropertyValue("--accent").trim() :
      "#FF5C00";
    const accent = new THREE.Color(rawAccent);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    // Pass pointer events through to the parent div so onPointerEnter/Leave fire.
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
    fill.position.set(-4, -2, 2);
    scene.add(fill);

    const pivot = new THREE.Group();
    if (!autoSpin) {
      pivot.rotation.x = THREE.MathUtils.degToRad(-25);
      pivot.rotation.y = THREE.MathUtils.degToRad(-25);
    }
    scene.add(pivot);

    let raf = 0;
    let disposed = false;
    let last = performance.now();
    let angle = 0;
    let angleY = 0;
    let speed = REST_SPEED;

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        materialsRef.current = [];
        model.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            const mat = new THREE.MeshStandardMaterial({
              color: accent,
              metalness: 0.55,
              roughness: 0.3,
            });
            obj.material = mat;
            materialsRef.current.push(mat);
          }
        });

        // Compute bounding sphere at identity model transform (no scale/rotation).
        model.updateWorldMatrix(true, true);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const sphere = box.getBoundingSphere(new THREE.Sphere());

        // Stacked Sketchfab GLTF matrices leave gear axis along world Y → face in XZ plane.
        // RotX(PI/2): (x,y,z) → (x,-z,y) brings face into XY plane (face-on to camera).
        // After scale(fit) + RotX(PI/2), bbox center (cx,cy,cz) → fit*(cx,-cz,cy).
        // Cancel with: position = (-fit*cx, fit*cz, -fit*cy).
        const viewHalfH = Math.tan((16 * Math.PI) / 180) * camera.position.z;
        const fit = (viewHalfH * 0.8) / (sphere.radius || 1);

        model.scale.setScalar(fit);
        model.rotation.x = Math.PI / 2;
        model.position.set(-fit * center.x, fit * center.z, -fit * center.y);

        pivot.add(model);
      },
      undefined,
      (err) => console.error("GearLogo: failed to load", src, err),
    );

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const target = autoSpin
        ? reduceMotion ? REST_SPEED : HOVER_SPEED
        : reduceMotion ? 0 : hoverRef.current ? HOVER_SPEED : REST_SPEED;

      speed += (target - speed) * Math.min(dt * 8, 1);
      angle += speed * dt;
      pivot.rotation.z = angle;

      if (autoSpin) {
        angleY += speed * 0.618 * dt;
        pivot.rotation.y = angleY;
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      renderer.dispose();
      materialsRef.current = [];
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, src]);

  // Cheap tint swap — no renderer teardown needed.
  useEffect(() => {
    if (!tint || materialsRef.current.length === 0) return;
    const color = new THREE.Color(tint);
    materialsRef.current.forEach((mat) => mat.color.set(color));
  }, [tint]);

  return (
    <div
      ref={mountRef}
      className={styles.logo}
      style={{ width: size, height: size }}
      aria-hidden="true"
      onPointerEnter={() => { hoverRef.current = true; }}
      onPointerLeave={() => { hoverRef.current = false; }}
    />
  );
}

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function BlackHole3D() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x01010b);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.25, 8.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setSize(host.clientWidth || 1, host.clientHeight || 1);
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // The uploaded cinematic black-hole image is the visual core of the decoration.
    const texture = new THREE.TextureLoader().load("/blackhole-cinematic.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const imagePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8.8, 4.95, 64, 32),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    imagePlane.position.z = -1.15;
    root.add(imagePlane);

    // Real 3D event horizon and layered gravitational rings.
    const horizon = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 1,
        metalness: 0,
      }),
    );
    horizon.position.z = 0.05;
    root.add(horizon);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.34, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x7c4dff,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    root.add(glow);

    const rings: THREE.Mesh[] = [];
    [1.45, 1.7, 2.05, 2.4].forEach((radius, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.025 + i * 0.006, 10, 160),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? 0x6f63ff : 0xbba7ff,
          transparent: true,
          opacity: 0.18 - i * 0.025,
          blending: THREE.AdditiveBlending,
        }),
      );
      ring.rotation.x = Math.PI * 0.39;
      ring.rotation.z = i * 0.18;
      root.add(ring);
      rings.push(ring);
    });

    // Dust/stellar particles moving around the black hole.
    const count = 850;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const radii = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 2.7 + Math.random() * 7.5;
      const angle = Math.random() * Math.PI * 2;
      radii[i] = radius;
      phases[i] = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 3;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xb9b4ff,
      size: 0.028,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      pointer.x += (pointer.tx - pointer.x) * 0.035;
      pointer.y += (pointer.ty - pointer.y) * 0.035;

      root.rotation.y += (pointer.x * 0.18 - root.rotation.y) * 0.025;
      root.rotation.x += (-pointer.y * 0.09 - root.rotation.x) * 0.025;

      imagePlane.position.y = Math.sin(t * 0.42) * 0.07;
      imagePlane.rotation.z = Math.sin(t * 0.22) * 0.008;

      horizon.scale.setScalar(1 + Math.sin(t * 1.5) * 0.018);
      glow.scale.setScalar(1 + Math.sin(t * 1.1) * 0.035);

      rings.forEach((ring, i) => {
        ring.rotation.y = t * (0.06 + i * 0.018);
        ring.rotation.z = i * 0.18 + Math.sin(t * 0.25 + i) * 0.04;
      });

      stars.rotation.y = t * 0.012;
      stars.rotation.x = Math.sin(t * 0.08) * 0.03;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onPointer);
      texture.dispose();
      starGeo.dispose();
      starMat.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      aria-label="Decorative 3D black hole"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-24"
    >
      <div
        ref={mount}
        className="relative h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#01010b] shadow-[0_0_80px_rgba(90,70,255,0.14)] sm:h-[480px]"
      />
    </section>
  );
}

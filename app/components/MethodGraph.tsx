"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ */
/* AIPM 工作流蓝图 · three.js 背景场景                                   */
/* · 四个发光节点（A/I/P/M）悬浮在纵深空间，曲线边连接                     */
/* · 发光数据包沿边流动，呼应「流程如何被设计」的叙事                      */
/* · 滚动驱动相机横移 + 鼠标视差；离开视口暂停渲染                        */
/* · three 按需动态加载（靠近视口才下载），reduced-motion 完全不启动       */
/* ------------------------------------------------------------------ */

const NODE_COLORS = [0x00c8ff, 0xffd84a, 0xd84cff, 0xff6a1a];

export function MethodGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    let started = false;

    const init = async () => {
      if (disposed || started) return;
      started = true;

      try {
        const THREE = await import("three");
        if (disposed) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0.4, 9.5);

        /* ---- 节点 ---- */
        const isNarrow = width < 768;
        const spreadX = isNarrow ? 3.4 : 5.6;
        const nodePositions = NODE_COLORS.map((_, i) => {
          const t = i / (NODE_COLORS.length - 1); // 0..1
          return new THREE.Vector3(
            (t - 0.5) * 2 * spreadX,
            Math.sin(t * Math.PI * 1.6) * 0.9 - 0.1,
            Math.cos(t * Math.PI * 2.2) * 1.4 - 0.5
          );
        });

        // 径向渐变发光贴图（canvas 生成，避免外部资源）
        const glowCanvas = document.createElement("canvas");
        glowCanvas.width = glowCanvas.height = 128;
        const gctx = glowCanvas.getContext("2d");
        if (!gctx) return;
        const grad = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.25, "rgba(255,255,255,0.5)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        gctx.fillStyle = grad;
        gctx.fillRect(0, 0, 128, 128);
        const glowTexture = new THREE.CanvasTexture(glowCanvas);

        const disposables: { dispose: () => void }[] = [glowTexture];

        const nodes = nodePositions.map((pos, i) => {
          const color = new THREE.Color(NODE_COLORS[i]);

          const coreGeo = new THREE.SphereGeometry(0.09, 24, 24);
          const coreMat = new THREE.MeshBasicMaterial({ color });
          const core = new THREE.Mesh(coreGeo, coreMat);
          core.position.copy(pos);
          scene.add(core);

          const spriteMat = new THREE.SpriteMaterial({
            map: glowTexture,
            color,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const sprite = new THREE.Sprite(spriteMat);
          sprite.position.copy(pos);
          sprite.scale.setScalar(1.25);
          scene.add(sprite);

          disposables.push(coreGeo, coreMat, spriteMat);
          return { core, sprite, phase: i * 1.7 };
        });

        /* ---- 曲线边 + 流动数据包 ---- */
        const curves: InstanceType<typeof THREE.QuadraticBezierCurve3>[] = [];
        for (let i = 0; i < nodePositions.length - 1; i++) {
          const a = nodePositions[i];
          const b = nodePositions[i + 1];
          const mid = a.clone().add(b).multiplyScalar(0.5);
          mid.y += 0.7;
          mid.z += 0.4;
          const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
          curves.push(curve);

          const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
          const lineMat = new THREE.LineBasicMaterial({
            color: 0xaac8ff,
            transparent: true,
            opacity: 0.16,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          scene.add(new THREE.Line(lineGeo, lineMat));
          disposables.push(lineGeo, lineMat);
        }

        // 每条边 2 个数据包
        const packetGeo = new THREE.SphereGeometry(0.045, 12, 12);
        disposables.push(packetGeo);
        const packets: {
          mesh: InstanceType<typeof THREE.Mesh>;
          curve: InstanceType<typeof THREE.QuadraticBezierCurve3>;
          offset: number;
          speed: number;
        }[] = [];
        curves.forEach((curve, i) => {
          for (let k = 0; k < 2; k++) {
            const mat = new THREE.MeshBasicMaterial({
              color: NODE_COLORS[i + 1],
              transparent: true,
              opacity: 0.95,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            });
            const mesh = new THREE.Mesh(packetGeo, mat);
            scene.add(mesh);
            packets.push({
              mesh,
              curve,
              offset: k * 0.5 + i * 0.17,
              speed: 0.09 + i * 0.015,
            });
            disposables.push(mat);
          }
        });

        /* ---- 背景星尘 ---- */
        const dustCount = isNarrow ? 60 : 130;
        const dustPos = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount; i++) {
          dustPos[i * 3] = (Math.random() - 0.5) * 16;
          dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
          dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
          color: 0x88aaff,
          size: 0.035,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);
        disposables.push(dustGeo, dustMat);

        /* ---- 交互状态 ---- */
        const mouse = { x: 0, y: 0 };
        const onMouse = (e: MouseEvent) => {
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("mousemove", onMouse, { passive: true });

        // 滚动进度：0 = 章节刚进视口，1 = 章节离开视口
        let scrollProgress = 0.5;
        const onScroll = () => {
          const rect = container.getBoundingClientRect();
          const total = window.innerHeight + rect.height;
          scrollProgress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const onResize = () => {
          const w = container.clientWidth;
          const h = container.clientHeight;
          if (w === 0 || h === 0) return;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        // 视口内才渲染（IntersectionObserver 控制）
        let inView = true;
        const io = new IntersectionObserver(
          (entries) => { inView = entries[0]?.isIntersecting ?? true; },
          { rootMargin: "100px" }
        );
        io.observe(container);

        let raf = 0;
        const clock = new THREE.Clock();
        const lookTarget = new THREE.Vector3();

        const tick = () => {
          raf = requestAnimationFrame(tick);
          if (!inView) return;

          const t = clock.getElapsedTime();

          // 节点呼吸
          nodes.forEach((n, i) => {
            const pulse = 1 + Math.sin(t * 1.6 + n.phase) * 0.18;
            n.sprite.scale.setScalar(1.25 * pulse);
            n.core.scale.setScalar(1 + Math.sin(t * 1.6 + n.phase) * 0.08);
            void i;
          });

          // 数据包流动
          packets.forEach((p) => {
            const u = (t * p.speed + p.offset) % 1;
            p.curve.getPoint(u, p.mesh.position);
            const fade = Math.sin(u * Math.PI); // 端点处淡入淡出
            (p.mesh.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = 0.95 * fade;
          });

          dust.rotation.y = t * 0.02;

          // 相机：滚动横移 + 鼠标视差（缓动跟随）
          const targetX = (scrollProgress - 0.5) * 3.2 + mouse.x * 0.5;
          const targetY = 0.4 - mouse.y * 0.3;
          camera.position.x += (targetX - camera.position.x) * 0.04;
          camera.position.y += (targetY - camera.position.y) * 0.04;
          lookTarget.set(camera.position.x * 0.55, 0, 0);
          camera.lookAt(lookTarget);

          renderer.render(scene, camera);
        };
        tick();

        cleanup = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          window.removeEventListener("mousemove", onMouse);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          disposables.forEach((d) => d.dispose());
          renderer.dispose();
          renderer.domElement.parentNode?.removeChild(renderer.domElement);
          renderer.getContext().getExtension("WEBGL_lose_context")?.loseContext();
        };
      } catch {
        // WebGL 不可用 / three 加载失败：静默降级，DOM 内容不受影响
      }
    };

    // 章节靠近视口时再下载 three 并初始化
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          init();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(container);

    return () => {
      disposed = true;
      io.disconnect();
      cleanup?.();
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 right-0 h-[78%] z-0 opacity-70"
      style={{
        maskImage: "linear-gradient(to bottom, black 62%, transparent 98%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 62%, transparent 98%)",
      }}
    />
  );
}

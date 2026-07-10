import React, { useEffect, useRef } from "react";

export default function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Redimensionar canvas de forma responsiva para se adequar ao contêiner pai
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Estrutura de partículas
    const particleCount = 200;
    const particles: {
      x3d: number;
      y3d: number;
      z3d: number;
      color: string;
      size: number;
    }[] = [];

    // Distribuir partículas uniformemente em uma esfera 3D usando espiral de Fibonacci
    const baseRadius = Math.min(width * 0.35, 175); // Dinâmico de acordo com a largura da tela
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x3d = baseRadius * Math.sin(phi) * Math.cos(theta);
      const y3d = baseRadius * Math.sin(phi) * Math.sin(theta);
      const z3d = baseRadius * Math.cos(phi);

      // Tons premium variando do azul tecnológico brilhante ao ciano elétrico
      const colorRatio = i / particleCount;
      const r = Math.floor(37 + colorRatio * 22);   // #2563eb a #3b82f6
      const g = Math.floor(99 + colorRatio * 31);
      const b = Math.floor(235 + colorRatio * 20);
      const color = `rgba(${r}, ${g}, ${b}, `;

      particles.push({
        x3d,
        y3d,
        z3d,
        color,
        size: Math.random() * 1.5 + 1.2,
      });
    }

    // Controle de rotação
    let rotateX = 0.0015;
    let rotateY = 0.0025;
    let targetRotateX = rotateX;
    let targetRotateY = rotateY;

    // Interatividade física com mouse
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isOver: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      
      mouse.targetX = x;
      mouse.targetY = y;
      mouse.isOver = true;

      // Inclinar levemente os eixos da esfera de acordo com a posição do mouse
      targetRotateX = y * 0.00004;
      targetRotateY = x * 0.00004;
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
      targetRotateX = 0.0012;
      targetRotateY = 0.0022;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Loop principal de desenho (60 FPS otimizado)
    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Amortecimento físico de rotação (estilo mola)
      rotateX += (targetRotateX - rotateX) * 0.06;
      rotateY += (targetRotateY - rotateY) * 0.06;

      const cosX = Math.cos(rotateX);
      const sinX = Math.sin(rotateX);
      const cosY = Math.cos(rotateY);
      const sinY = Math.sin(rotateY);

      const projected: { x: number; y: number; z: number; size: number; color: string; zVal: number }[] = [];
      const breathe = 1 + Math.sin(time * 1.2) * 0.035; // Expansão sutil (respiração da máquina)

      particles.forEach((p) => {
        let x = p.x3d * breathe;
        let y = p.y3d * breathe;
        let z = p.z3d * breathe;

        // Efeito de repulsão do mouse caso esteja em hover
        if (mouse.isOver) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const pushFactor = (110 - dist) * 0.06;
            x += (dx / (dist || 1)) * pushFactor;
            y += (dy / (dist || 1)) * pushFactor;
          }
        }

        // Rotação Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // Rotação X
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // Projeção Perspective 3D
        const fov = 380;
        const scale = fov / (fov + z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        // Fade out para partículas que vão ao fundo (depth)
        const alpha = Math.max(0.06, Math.min(0.9, (fov - z2) / (fov * 1.35)));
        const finalColor = `${p.color}${alpha.toFixed(3)})`;

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          size: p.size * scale,
          color: finalColor,
          zVal: z2
        });
      });

      // Ordenação para profundidade Z real (Painter's Algorithm)
      projected.sort((a, b) => b.zVal - a.zVal);

      // Constelações Digitais (Desenha linhas sutis ligando os nós da esfera)
      ctx.lineWidth = 0.4;
      const maxConnectDistance = 45;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        let connections = 0;
        for (let j = i + 1; j < projected.length; j++) {
          if (connections > 2) break; // Limita conexões para não poluir visualmente
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            connections++;
            // Opacidade da linha ligando os pontos com base na proximidade e profundidade
            const lineAlpha = (1 - dist / maxConnectDistance) * 0.12 * Math.max(0.05, (380 - (p1.zVal + p2.zVal)/2) / 380);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Renderizar os nós (pontos da esfera)
      projected.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo de brilho branco para as partículas que estão na frente
        if (p.zVal < -50) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Suavizar movimento do mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="opacity-70 md:opacity-85" />
    </div>
  );
}

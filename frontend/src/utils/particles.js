// particles.js - 粒子动画效果工具

/**
 * 初始化粒子动画
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 400;
  
  let particlesArray = [];
  const numberOfParticles = 80;
  const colors = ['rgba(255, 255, 255, 0.3)', 'rgba(173, 216, 230, 0.3)', 'rgba(135, 206, 235, 0.3)'];
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      
      // 绘制连线
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + (1 - distance/100) * 0.2 + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = 400;
    init();
  });
  
  init();
  animate();
}

/**
 * 初始化3D背景效果
 * @param {string} canvasId - Canvas元素的ID
 */
function init3DBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const parentElement = canvas.parentElement;
  
  // 设置Canvas大小
  function resizeCanvas() {
    canvas.width = parentElement.offsetWidth;
    canvas.height = parentElement.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // 定义3D点
  class Point3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = 1.5;
      this.initialZ = z;
      this.speed = Math.random() * 0.5 + 0.2;
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
    }
    
    // 3D到2D投影
    project(width, height, fov, distance) {
      const factor = fov / (distance + this.z);
      const x2d = this.x * factor + width / 2;
      const y2d = this.y * factor + height / 2;
      return { x: x2d, y: y2d, size: this.size * factor };
    }
    
    // 更新点的位置
    update() {
      this.z -= this.speed;
      
      // 当点移动到最近距离时，重置到最远距离
      if (this.z < -100) {
        this.z = 1000;
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
      }
    }
  }
  
  // 创建点集合
  const numPoints = 200;
  const points = [];
  const spread = 1000; // 点的分布范围
  const fov = 250;     // 视场
  const distance = 100; // 观察距离
  
  for (let i = 0; i < numPoints; i++) {
    const x = (Math.random() - 0.5) * spread * 2;
    const y = (Math.random() - 0.5) * spread * 2;
    const z = Math.random() * spread;
    points.push(new Point3D(x, y, z));
  }
  
  // 鼠标交互
  let mouseX = 0;
  let mouseY = 0;
  let mouseSpeed = { x: 0, y: 0 };
  let lastMouseX = 0;
  let lastMouseY = 0;
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    mouseSpeed.x = mouseX - lastMouseX;
    mouseSpeed.y = mouseY - lastMouseY;
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  });
  
  // 创建和连接点
  function connectPoints(points, ctx, width, height) {
    // 绘制线条
    for (let i = 0; i < points.length; i++) {
      const pointA = points[i].project(width, height, fov, distance);
      
      for (let j = i + 1; j < points.length; j++) {
        const pointB = points[j].project(width, height, fov, distance);
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.lineWidth = 0.5;
          const opacity = (1 - dist / 100) * 0.2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(pointA.x, pointA.y);
          ctx.lineTo(pointB.x, pointB.y);
          ctx.stroke();
        }
      }
    }
    
    // 绘制点
    for (let i = 0; i < points.length; i++) {
      const point = points[i].project(width, height, fov, distance);
      
      ctx.fillStyle = points[i].color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 应用鼠标影响，创建微妙的拖拽效果
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dragFactor = 0.1;
    
    // 更新所有点的位置
    for (let i = 0; i < points.length; i++) {
      points[i].update();
      
      // 鼠标拖拽影响
      if (mouseSpeed.x !== 0 || mouseSpeed.y !== 0) {
        const distX = centerX - mouseX;
        const distY = centerY - mouseY;
        points[i].x += mouseSpeed.x * dragFactor * (points[i].z / 1000);
        points[i].y += mouseSpeed.y * dragFactor * (points[i].z / 1000);
      }
    }
    
    // 绘制连接
    connectPoints(points, ctx, canvas.width, canvas.height);
    
    // 逐渐减少鼠标影响
    mouseSpeed.x *= 0.95;
    mouseSpeed.y *= 0.95;
    
    // 循环动画
    requestAnimationFrame(animate);
  }
  
  // 启动动画
  animate();
} 
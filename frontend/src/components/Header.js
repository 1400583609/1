// Header.js - 页面公共头部组件
function createHeader() {
  const headerHTML = `
    <header class="header">
      <div class="container navbar">
        <div class="logo">
          <img src="../assets/logo.svg" alt="动维康">
          <span>动维康</span>
        </div>
        <nav class="nav-links">
          <a href="HomePage.html" class="nav-link">
            <i class="fas fa-home"></i>首页
          </a>
          <a href="HealthMonitoring.html" class="nav-link">
            <i class="fas fa-chart-bar"></i>健康看板
          </a>
          <a href="#exercise-prescription" class="nav-link">
            <i class="fas fa-running"></i>运动处方
          </a>
          <a href="TCMMedicine.html" class="nav-link">
            <i class="fas fa-yin-yang"></i>中医养生
          </a>
          <a href="#ai-consultation" class="nav-link">
            <i class="fas fa-robot"></i>智能问诊
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-ellipsis-h"></i>更多
          </a>
        </nav>
        <div class="auth-buttons">
          <a href="#" class="btn btn-sm btn-outline">登录</a>
          <a href="#" class="btn btn-sm btn-primary">注册</a>
        </div>
        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-toggle">
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  `;

  // 设置当前页面的活动状态
  setTimeout(() => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else if (currentPage === '' && href === 'HomePage.html') {
        link.classList.add('active');
      }
    });

    // 移动端菜单切换
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  }, 0);

  return headerHTML;
}

export default createHeader; 
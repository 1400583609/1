// Main JavaScript file for the DongWeiKang Health Platform

// DOM elements
const preloader = document.querySelector('.preloader');
const headerContainer = document.getElementById('header-container');
const footerContainer = document.getElementById('footer-container');

// Hide preloader when page is loaded
window.addEventListener('load', function() {
  setTimeout(function() {
    // Hide preloader with fade effect
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    document.body.classList.add('page-loaded');
    
    // Initialize scroll indicator
    initScrollIndicator();
  }, 1000);
});

// Initialize scroll indicator
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator-progress');
  if (!scrollIndicator) return;
  
  window.addEventListener('scroll', function() {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    
    scrollIndicator.style.width = scrolled + '%';
  });
}

// Load header and footer components from HTML fragments
function loadComponents() {
  // Simple implementation without external component loader
  // Create header content
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="header">
        <div class="container">
          <div class="navbar">
            <a href="/" class="logo">
              <img src="../assets/logo.svg" alt="动维康" width="120" height="40">
            </a>
            <nav class="nav-links">
              <a href="/" class="nav-link active"><i class="fas fa-home"></i> 首页</a>
              <a href="#health-management" class="nav-link"><i class="fas fa-chart-line"></i> 健康管理</a>
              <a href="#exercise-prescription" class="nav-link"><i class="fas fa-dumbbell"></i> 运动处方</a>
              <a href="#tcm" class="nav-link"><i class="fas fa-leaf"></i> 中医养生</a>
              <a href="#ai-consultation" class="nav-link"><i class="fas fa-robot"></i> 智能问诊</a>
            </nav>
            <div class="auth-buttons">
              <a href="/pages/login.html" class="btn btn-outline">登录</a>
              <a href="#" class="btn btn-primary">注册</a>
            </div>
          </div>
        </div>
      </header>
    `;
  }
  
  // Create footer content
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="main-footer">
        <div class="container">
          <div class="footer-columns">
            <div class="footer-column">
              <div class="footer-logo">
                <img src="../assets/logo.svg" alt="动维康" width="100" height="32">
              </div>
              <p>动维康是专为老年人打造的智能健康管理平台，融合中医养生与现代健康理念，提供个性化健康管理方案。</p>
              <div class="social-icons">
                <a href="#"><i class="fab fa-weixin"></i></a>
                <a href="#"><i class="fab fa-weibo"></i></a>
                <a href="#"><i class="fab fa-qq"></i></a>
              </div>
            </div>
            
            <div class="footer-column">
              <h3>关于我们</h3>
              <ul class="footer-links-grid">
                <li><a href="#"><i class="fas fa-angle-right"></i> 公司简介</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 企业文化</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 服务条款</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 隐私政策</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 加入我们</a></li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h3>用户支持</h3>
              <ul class="footer-links-grid">
                <li><a href="#"><i class="fas fa-angle-right"></i> 帮助中心</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 常见问题</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 意见反馈</a></li>
                <li><a href="#"><i class="fas fa-angle-right"></i> 联系我们</a></li>
              </ul>
              <div class="contact-info">
                <div class="contact-item">
                  <i class="fas fa-phone-alt"></i>
                  <div>
                    <div class="phone-label">全国服务热线</div>
                    <div class="phone-number">400-800-1234</div>
                  </div>
                </div>
                <div class="contact-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <div class="time-label">服务时间</div>
                    <div>周一至周日 8:00-20:00</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="footer-column">
              <h3>下载APP</h3>
              <p>扫描二维码，立即下载动维康APP</p>
              <img src="../assets/qrcode.svg" alt="下载APP" width="120" height="120">
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>© 2025 动维康健康科技有限公司 版权所有 | 京ICP备12345678号</p>
            <div class="security-badges">
              <a href="#"><img src="../assets/security1.svg" alt="可信网站"></a>
              <a href="#"><img src="../assets/security2.svg" alt="网络警察"></a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// Create missing security badge SVGs
function createMissingAssets() {
  // We'll let the 404s happen for now as they don't prevent functionality
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  loadComponents();
  createMissingAssets();
}); 
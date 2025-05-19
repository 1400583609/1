// Footer.js - 页面公共底部组件
function createFooter() {
  const footerHTML = `
    <footer class="main-footer">
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <div class="footer-logo">
              <img src="../assets/logo.svg" alt="动维康">
              <span>动维康</span>
            </div>
            <p>专为老年人打造的智能健康管理平台，融合中医养生与现代健康理念，提供个性化健康管理方案。</p>
            <div class="social-icons">
              <a href="#" aria-label="微信"><i class="fab fa-weixin"></i></a>
              <a href="#" aria-label="微博"><i class="fab fa-weibo"></i></a>
              <a href="#" aria-label="QQ"><i class="fab fa-qq"></i></a>
            </div>
          </div>
          
          <div class="footer-column">
            <h3>快速链接</h3>
            <div class="footer-links-grid">
              <li><a href="HomePage.html"><i class="fas fa-angle-right"></i> 首页</a></li>
              <li><a href="HealthMonitoring.html"><i class="fas fa-angle-right"></i> 健康看板</a></li>
              <li><a href="#exercise-prescription"><i class="fas fa-angle-right"></i> 运动处方</a></li>
              <li><a href="TCMMedicine.html"><i class="fas fa-angle-right"></i> 中医养生</a></li>
              <li><a href="#ai-consultation"><i class="fas fa-angle-right"></i> 智能问诊</a></li>
              <li><a href="#"><i class="fas fa-angle-right"></i> 关于我们</a></li>
            </div>
          </div>
          
          <div class="footer-column">
            <h3>联系我们</h3>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-phone-alt"></i>
                <div>
                  <p class="phone-label">客服热线</p>
                  <p class="phone-number">400-123-4567</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <p>contact@dongweikang.com</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-clock"></i>
                <div>
                  <p class="time-label">服务时间</p>
                  <p>周一至周日 9:00-21:00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer-column">
            <h3>订阅通讯</h3>
            <p>订阅我们的通讯，获取最新的健康资讯和平台动态。</p>
            <form class="subscribe-form">
              <div class="form-group">
                <input type="email" placeholder="请输入您的邮箱" required>
                <button type="submit"><i class="fas fa-paper-plane"></i></button>
              </div>
            </form>
            <div class="security-badges">
              <img src="../assets/trust-badge-1.svg" alt="安全认证">
              <img src="../assets/trust-badge-2.svg" alt="隐私保护">
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2023 动维康健康管理平台 版权所有 | 京ICP备12345678号</p>
        </div>
      </div>
    </footer>
    
    <!-- 悬浮按钮 -->
    <div class="float-buttons">
      <a href="#" class="float-button chat-btn">
        <i class="fas fa-comments"></i>
      </a>
      <a href="tel:400-123-4567" class="float-button phone-btn">
        <i class="fas fa-phone-alt"></i>
      </a>
      <div class="float-button qrcode-btn">
        <i class="fas fa-qrcode"></i>
        <div class="qrcode-popup">
          <img src="../assets/qrcode.svg" alt="微信二维码">
          <p>扫码关注公众号</p>
        </div>
      </div>
    </div>
    
    <!-- 返回顶部 -->
    <div class="back-to-top">
      <i class="fas fa-chevron-up"></i>
    </div>
  `;

  // 添加交互逻辑
  setTimeout(() => {
    // 返回顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // 订阅表单处理
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
          alert('感谢您的订阅！我们将定期为您发送健康资讯。');
          this.reset();
        }
      });
    }
  }, 0);

  return footerHTML;
}

export default createFooter; 
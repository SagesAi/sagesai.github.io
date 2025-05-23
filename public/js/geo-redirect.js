/**
 * 基于 IP 地理位置的自动语言重定向脚本
 * 使用免费的 IP 地理位置 API 服务
 */

(function() {
  // 检查是否已经有语言偏好设置
  const hasLanguagePreference = localStorage.getItem('language_preference');
  
  // 如果用户已经设置了语言偏好或者当前不在首页，则不进行重定向
  if (hasLanguagePreference || 
      (window.location.pathname !== '/' && 
       !window.location.pathname.endsWith('/en/') && 
       !window.location.pathname.endsWith('/zh/'))) {
    return;
  }

  // 检查当前URL是否已经包含语言路径
  const currentPath = window.location.pathname;
  if (currentPath.startsWith('/en/') || (currentPath.match(/^\/[^\/]+\/$/) && currentPath !== '/')) {
    // 已经在特定语言页面，设置语言偏好
    const lang = currentPath.startsWith('/en/') ? 'en' : 'zh';
    localStorage.setItem('language_preference', lang);
    return;
  }

  // 使用 ipinfo.io 免费 API 获取 IP 地理位置信息
  fetch('https://ipinfo.io/json?token=c4d47e3e69a3b0')
    .then(response => response.json())
    .then(data => {
      // 根据国家/地区代码决定语言
      const country = data.country;
      
      // 中国大陆、香港、澳门、台湾地区使用中文
      const chineseRegions = ['CN', 'HK', 'MO', 'TW'];
      
      // 默认语言
      let targetLang = chineseRegions.includes(country) ? 'zh' : 'en';
      
      // 保存语言偏好
      localStorage.setItem('language_preference', targetLang);
      
      // 如果需要重定向到不同语言版本
      const currentLang = window.location.pathname.startsWith('/en/') ? 'en' : 'zh';
      if (targetLang !== currentLang) {
        // 构建重定向 URL
        let redirectUrl = '';
        if (targetLang === 'zh') {
          // 如果目标是中文（默认语言），移除 /en/ 前缀
          redirectUrl = window.location.pathname.replace(/^\/en\//, '/');
        } else {
          // 如果目标是英文，添加 /en/ 前缀
          redirectUrl = '/en' + (window.location.pathname === '/' ? '/' : window.location.pathname);
        }
        
        // 执行重定向
        window.location.href = redirectUrl;
      }
    })
    .catch(error => {
      console.error('IP 地理位置检测失败:', error);
    });
})();

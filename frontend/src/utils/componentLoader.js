// componentLoader.js - 加载组件到页面的工具函数

/**
 * 将组件内容加载到指定的HTML元素中
 * @param {string} componentHTML - 组件的HTML内容
 * @param {string} targetSelector - 目标元素的CSS选择器
 * @param {string} position - 插入位置 ('append', 'prepend', 'replace', 'before', 'after')
 */
function loadComponent(componentHTML, targetSelector, position = 'replace') {
  const targetElement = document.querySelector(targetSelector);
  
  if (!targetElement) {
    console.error(`目标元素 "${targetSelector}" 不存在`);
    return;
  }
  
  switch (position) {
    case 'append':
      targetElement.insertAdjacentHTML('beforeend', componentHTML);
      break;
    case 'prepend':
      targetElement.insertAdjacentHTML('afterbegin', componentHTML);
      break;
    case 'replace':
      targetElement.innerHTML = componentHTML;
      break;
    case 'before':
      targetElement.insertAdjacentHTML('beforebegin', componentHTML);
      break;
    case 'after':
      targetElement.insertAdjacentHTML('afterend', componentHTML);
      break;
    default:
      console.error(`不支持的插入位置: ${position}`);
  }
}

/**
 * 动态导入组件并加载到页面中
 * @param {string} componentPath - 组件的路径
 * @param {string} targetSelector - 目标元素的CSS选择器
 * @param {string} position - 插入位置
 */
async function loadComponentAsync(componentPath, targetSelector, position = 'replace') {
  try {
    // 使用动态导入加载组件
    const module = await import(componentPath);
    const componentHTML = module.default();
    
    loadComponent(componentHTML, targetSelector, position);
    return true;
  } catch (error) {
    console.error(`加载组件失败: ${error.message}`);
    return false;
  }
}

export { loadComponent, loadComponentAsync }; 
/**
 * 个人网站主 JavaScript 文件
 * 包含导航、动画、表单处理等交互功能
 */

// DOM 元素
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const typingText = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');

// 打字机效果配置
const typingConfig = {
    texts: ['前端开发者', 'UI/UX 设计师', '全栈工程师', '创意工作者'],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000
};

/**
 * 初始化
 */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initBackToTop();
    initProjectFilter();
    initContactForm();
    initSkillProgress();
    initStatCounter();
    initSmoothScroll();
});

/**
 * 导航功能
 */
function initNavigation() {
    // 移动端菜单切换
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // 点击导航链接关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 滚动时更新导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // 滚动时更新活动导航项
    updateActiveNavOnScroll();
}

/**
 * 更新活动导航项
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * 打字机效果
 */
function initTypingEffect() {
    if (!typingText) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typingConfig.texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? typingConfig.deletingSpeed : typingConfig.typingSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = typingConfig.pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingConfig.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/**
 * 滚动效果
 */
function initScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * 回到顶部
 */
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });
    
    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 项目筛选
 */
function initProjectFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // 筛选项目
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * 联系表单
 */
function initContactForm() {
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 表单验证
        if (!validateForm(data)) {
            return;
        }
        
        // 模拟提交
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';
        
        // 这里可以替换为实际的表单提交逻辑
        setTimeout(() => {
            showNotification('消息已发送！我会尽快回复您。', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    });
}

/**
 * 表单验证
 */
function validateForm(data) {
    const { name, email, subject, message } = data;
    
    if (!name || !email || !subject || !message) {
        showNotification('请填写所有必填字段', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return false;
    }
    
    return true;
}

/**
 * 显示通知
 */
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    existingNotification?.remove();
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="关闭通知">&times;</button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // 添加关闭按钮样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // 关闭按钮事件
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // 自动关闭
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/**
 * 技能进度条动画
 */
function initSkillProgress() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.dataset.level;
                
                setTimeout(() => {
                    progressBar.style.width = `${level}%`;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * 统计数字动画
 */
function initStatCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.dataset.target);
                animateNumber(statNumber, target);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * 数字动画
 */
function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (target - start) + start);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 键盘导航支持
 */
document.addEventListener('keydown', (e) => {
    // ESC 关闭移动端菜单
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/**
 * 性能优化：防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 性能优化：节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用节流优化滚动事件
const optimizedScrollHandler = throttle(() => {
    // 滚动相关的处理逻辑
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

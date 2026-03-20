/**
 * Smart Club - Shared JS
 */

window.handleLogout = function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
};

window.checkAuth = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
};

window.renderNavbar = function(options = {}) {
    const { isTransparent = false, activePage = '' } = options;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || 'Student';
    const navAuthSection = document.getElementById('navAuthSection');
    
    if (!navAuthSection) return;

    const navLinkClass = isTransparent ? 'text-white' : 'text-dark';
    const dropdownToggleClass = isTransparent ? 'text-white' : 'text-dark';

    if (isLoggedIn) {
        const navLinks = `
            <li class="nav-item">
                <a class="nav-link ${navLinkClass}" href="index.html">
                    <i class="bi bi-house me-1"></i>首页
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${navLinkClass}" href="recommend.html">
                    <i class="bi bi-stars me-1"></i>活动推荐
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${navLinkClass}" href="publish.html">
                    <i class="bi bi-pencil-square me-1"></i>发布活动
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${navLinkClass}" href="history.html">
                    <i class="bi bi-clock-history me-1"></i>历史记录
                </a>
            </li>
        `;

        navAuthSection.innerHTML = `
            ${navLinks}
            <li class="nav-item ms-2">
                <div class="dropdown">
                    <a class="d-flex align-items-center text-decoration-none dropdown-toggle ${dropdownToggleClass} fw-bold" href="#" data-bs-toggle="dropdown">
                        <img src="https://placehold.co/100x100" class="rounded-circle border border-2 border-primary me-2" width="36" height="36" alt="Avatar">
                        <span>${username}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 mt-2">
                        <li><a class="dropdown-item py-2" href="profile.html"><i class="bi bi-person me-2 text-muted"></i>个人中心</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item py-2 text-danger" href="#" onclick="handleLogout(event)"><i class="bi bi-box-arrow-right me-2"></i>退出登录</a></li>
                    </ul>
                </div>
            </li>
        `;
    } else {
        navAuthSection.innerHTML = `
            <li class="nav-item">
                <a class="nav-link ${navLinkClass}" href="index.html">
                    <i class="bi bi-house me-1"></i>首页
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${navLinkClass}" href="recommend.html">
                    <i class="bi bi-stars me-1"></i>活动推荐
                </a>
            </li>
            <li class="nav-item ms-2">
                <a class="btn btn-primary-gradient rounded-pill" href="login.html">登录 / 注册</a>
            </li>
        `;
    }
};

window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    
    // Create container if not exists
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    
    // Icon selection
    let iconClass = 'bi-info-circle-fill';
    if (type === 'success') iconClass = 'bi-check-circle-fill';
    else if (type === 'error') iconClass = 'bi-x-circle-fill';
    else if (type === 'warning') iconClass = 'bi-exclamation-triangle-fill';

    toast.innerHTML = `
        <i class="bi ${iconClass} fs-5" style="color: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'}-color)"></i>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Mock Activity Data
const activities = {
    "music": {
        title: "校园十佳歌手大赛",
        poster: "images/activity_music.png",
        tag: "音乐",
        publisher: "校学生会文艺部",
        date: "10月20日",
        time: "18:00 - 21:00",
        location: "学生活动中心大礼堂",
        description: "一年一度的校园歌手大赛即将拉开帷幕！这是一场专属于你的音乐盛宴，无论你是深情款款的情歌王子，还是爆发力十足的摇滚新星，亦或是独具韵味的民谣诗人，这里都是你展现自我的最佳舞台。",
        details: "通过层层选拔，最终脱颖而出的十位选手将在大礼堂进行巅峰对决。本次大赛特邀专业音乐制作人及知名校友担任评委，现场更有神秘嘉宾助阵表演。观众入场即可参与抽奖，幸运儿将获得精美礼品及签名海报。"
    },
    "tech": {
        title: "人工智能前沿论坛",
        poster: "images/activity_tech.png",
        tag: "科技",
        publisher: "计算机学院团委",
        date: "11月05日",
        time: "14:00 - 17:00",
        location: "学术报告厅",
        description: "探索AI的无限可能，聆听行业专家的前沿洞见。本次论坛邀请了来自知名科技公司和顶尖高校的专家学者，深入探讨大模型、生成式AI等热门话题。",
        details: "论坛将设置主题演讲、圆桌讨论和互动问答环节。无论你是AI领域的初学者还是资深研究者，都能在这里获得启发。参与者将有机会获得精美纪念品及讲座学时证明。"
    },
    "reading": {
        title: "周末沉浸式读书会",
        poster: "images/activity_reading.png",
        tag: "阅读",
        publisher: "图书馆读者协会",
        date: "11月12日",
        time: "09:00 - 11:30",
        location: "图书馆三楼研讨室",
        description: "在忙碌的学习生活中，找一段安静的时光，与书本为伴。每期精选一本经典著作，邀请导读嘉宾进行分享，随后进行自由交流。",
        details: "本期阅读书目：《百年孤独》。我们将一起走进马尔克斯的魔幻现实主义世界，探讨家族的兴衰与孤独的本质。现场提供免费咖啡和茶点，限额50人，请提前报名。"
    },
    "outdoor": {
        title: "森林公园徒步挑战",
        poster: "images/activity_outdoor.png",
        tag: "户外",
        publisher: "户外探险协会",
        date: "11月15日",
        time: "08:00 - 16:00",
        location: "国家森林公园",
        description: "远离城市喧嚣，亲近大自然。本次徒步路线全长15公里，沿途风景优美，空气清新。既是体力的挑战，也是心灵的放松。",
        details: "请穿着舒适的运动鞋和运动服，自备午餐和饮用水。集合地点：学校南门。费用：AA制（约50元/人，含包车费和保险）。"
    }
};

// Common Init
document.addEventListener('DOMContentLoaded', () => {
    // Add toast container styles dynamically if needed, 
    // but they are already in style.css which is preferred.
    console.log('Smart Club JS Loaded');
});

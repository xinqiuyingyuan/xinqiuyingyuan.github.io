// 信秋映鸢博客网站主要JavaScript文件
// 处理JSONBin.io数据存储功能

class BlogDataManager {
    constructor() {
        // JSONBin.io 配置 - 您的配置信息
        this.binId = '68fdaacfae596e708f2d43c2';
        this.apiKey = '$2a$10$EKRBZoCx/AKrVXI22O4WN.V70aurz2IBobjWu11jldQiF7/ClhplO';
        this.baseUrl = 'https://api.jsonbin.io/v3/b';
        
        // 本地数据存储
        this.articles = [];
        this.studyRecords = [];
        this.messages = [];
        
        // 初始化
        this.init();
    }
    
    async init() {
        try {
            console.log('正在初始化数据管理器...');
            
            // 自动设置JSONBin.io配置
            this.setJsonBinConfig();
            
            // 尝试从localStorage加载数据
            this.loadFromLocalStorage();
            
            // 尝试从云端加载数据
            console.log('正在从云端加载数据...');
            const cloudLoaded = await this.loadFromCloud();
            
            if (cloudLoaded) {
                console.log('云端数据加载成功，已同步到本地');
            } else {
                console.log('云端数据加载失败，使用本地数据');
            }
        } catch (error) {
            console.log('数据初始化完成，使用本地数据');
        }
    }
    
    // 设置JSONBin.io配置（已预设您的配置）
    setJsonBinConfig(binId, apiKey) {
        this.binId = binId || this.binId;
        this.apiKey = apiKey || this.apiKey;
        localStorage.setItem('jsonbin_binId', this.binId);
        localStorage.setItem('jsonbin_apiKey', this.apiKey);
        console.log('JSONBin.io 配置已设置:', { binId: this.binId, apiKey: '***' });
    }
    
    // 从localStorage加载数据
    loadFromLocalStorage() {
        try {
            const savedArticles = localStorage.getItem('blog_articles');
            const savedStudyRecords = localStorage.getItem('blog_studyRecords');
            const savedMessages = localStorage.getItem('blog_messages');
            
            if (savedArticles) {
                this.articles = JSON.parse(savedArticles);
            }
            if (savedStudyRecords) {
                this.studyRecords = JSON.parse(savedStudyRecords);
            }
            if (savedMessages) {
                this.messages = JSON.parse(savedMessages);
            }
        } catch (error) {
            console.error('加载本地数据失败:', error);
        }
    }
    
    // 保存到localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('blog_articles', JSON.stringify(this.articles));
            localStorage.setItem('blog_studyRecords', JSON.stringify(this.studyRecords));
            localStorage.setItem('blog_messages', JSON.stringify(this.messages));
        } catch (error) {
            console.error('保存到本地存储失败:', error);
        }
    }
    
    // 从云端加载数据
    async loadFromCloud() {
        if (!this.binId || !this.apiKey) {
            console.log('JSONBin.io配置不完整，使用本地数据');
            return false;
        }
        
        try {
            console.log('正在从云端加载数据...');
            const response = await fetch(`${this.baseUrl}/${this.binId}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const record = data.record;
                
                console.log('云端数据加载成功:', record);
                
                if (record.articles) this.articles = record.articles;
                if (record.studyRecords) this.studyRecords = record.studyRecords;
                if (record.messages) this.messages = record.messages;
                
                this.saveToLocalStorage();
                return true;
            } else {
                console.error('从云端加载数据失败:', response.status, response.statusText);
                return false;
            }
        } catch (error) {
            console.error('云端数据加载错误:', error);
            return false;
        }
    }
    
    // 保存到云端
    async saveToCloud() {
        if (!this.binId || !this.apiKey) {
            console.log('JSONBin.io未配置，使用本地存储');
            this.saveToLocalStorage();
            return false;
        }
        
        try {
            const data = {
                articles: this.articles,
                studyRecords: this.studyRecords,
                messages: this.messages,
                lastUpdated: new Date().toISOString()
            };
            
            console.log('正在保存数据到云端...', data);
            
            const response = await fetch(`${this.baseUrl}/${this.binId}`, {
                method: 'PUT',
                headers: {
                    'X-Master-Key': this.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                console.log('数据已保存到云端');
                return true;
            } else {
                console.error('保存到云端失败:', response.status, response.statusText);
                this.saveToLocalStorage();
                return false;
            }
        } catch (error) {
            console.error('云端保存错误:', error);
            this.saveToLocalStorage();
            return false;
        }
    }
    
    // 文章相关方法
    getArticles() {
        return this.articles;
    }
    
    getArticlesByCategory(category) {
        return this.articles.filter(article => article.category === category);
    }
    
    addArticle(article) {
        const newArticle = {
            ...article,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            comments: 0,
            liked: false
        };
        
        this.articles.unshift(newArticle);
        this.saveToCloud();
        return newArticle;
    }
    
    deleteArticle(id) {
        this.articles = this.articles.filter(article => article.id !== id);
        this.saveToCloud();
    }
    
    toggleArticleLike(id) {
        const article = this.articles.find(a => a.id === id);
        if (article) {
            if (article.liked) {
                article.likes--;
                article.liked = false;
            } else {
                article.likes++;
                article.liked = true;
            }
            this.saveToCloud();
            return article;
        }
        return null;
    }
    
    // 学习记录相关方法
    getStudyRecords() {
        return this.studyRecords;
    }
    
    updateStudyRecord(index, field, value) {
        if (this.studyRecords[index]) {
            this.studyRecords[index][field] = value;
            this.saveToCloud();
        }
    }
    
    addStudyRecord(record) {
        this.studyRecords.push(record);
        this.saveToCloud();
    }
    
    // 留言相关方法
    getMessages() {
        return this.messages;
    }
    
    addMessage(message) {
        const newMessage = {
            ...message,
            id: Date.now(),
            time: new Date().toLocaleString('zh-CN')
        };
        
        this.messages.unshift(newMessage);
        this.saveToCloud();
        return newMessage;
    }
    
    deleteMessage(id) {
        this.messages = this.messages.filter(message => message.id !== id);
        this.saveToCloud();
    }
    
    // 初始化示例数据
    initSampleData() {
        // 示例文章
        if (this.articles.length === 0) {
            this.articles = [
                {
                    id: 1,
                    title: "秋日私语",
                    excerpt: "秋风轻拂，落叶纷飞，这个季节总能带来无限遐想...",
                    content: "这是一个关于秋天的美丽故事，秋风轻拂，落叶纷飞，这个季节总能带来无限遐想。每当这个时候，我总会想起那些温暖的回忆，那些陪伴我度过美好时光的人们。",
                    category: "daily",
                    date: "2025-10-24",
                    likes: 12,
                    comments: 3,
                    liked: false
                },
                {
                    id: 2,
                    title: "JavaScript异步编程心得",
                    excerpt: "深入理解Promise和async/await的使用技巧...",
                    content: "在现代JavaScript开发中，异步编程是不可或缺的一部分。通过深入理解Promise和async/await，我们可以编写出更加优雅和高效的代码。",
                    category: "study",
                    date: "2025-10-23",
                    likes: 25,
                    comments: 8,
                    liked: false
                },
                {
                    id: 3,
                    title: "樱花盛开的季节",
                    excerpt: "记录今年春天最美的樱花盛开时刻...",
                    content: "春天来了，樱花如约而至。那些粉色的花瓣如同雪花般飘落，构成了一幅美丽的画卷。这是大自然送给我们的礼物，值得我们用心记录。",
                    category: "beautiful",
                    date: "2025-10-22",
                    likes: 18,
                    comments: 5,
                    liked: false
                }
            ];
        }
        
        // 示例留言
        if (this.messages.length === 0) {
            this.messages = [
                {
                    id: 1,
                    name: "小明",
                    email: "xiaoming@qq.com",
                    content: "学习规划很棒！加油！",
                    time: "2025-10-24 14:30"
                },
                {
                    id: 2,
                    name: "小红",
                    email: "xiaohong@qq.com",
                    content: "看到你的学习计划，我也想制定一个了！",
                    time: "2025-10-23 16:45"
                }
            ];
        }
        
        this.saveToLocalStorage();
    }
}

// 工具函数
class Utils {
    // 生成日期范围
    static generateDateRange(startDate, endDate) {
        const dates = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        let current = new Date(start);
        while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        
        return dates;
    }
    
    // 检查是否为周末
    static isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }
    
    // 格式化日期
    static formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }
    
    // 显示通知
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        switch (type) {
            case 'success':
                notification.style.background = '#90EE90';
                break;
            case 'error':
                notification.style.background = '#FF6B6B';
                break;
            case 'warning':
                notification.style.background = '#FFD700';
                break;
            default:
                notification.style.background = '#FFB7C5';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// 全局样式
const globalStyles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// 添加全局样式
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

// 创建全局数据管理器实例
window.blogData = new BlogDataManager();
window.utils = Utils;

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化示例数据
    window.blogData.initSampleData();
    
    // 显示欢迎消息
    setTimeout(() => {
        Utils.showNotification('欢迎来到信秋映鸢的博客！', 'success');
    }, 1000);
});

// 导出给其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogDataManager, Utils };
}
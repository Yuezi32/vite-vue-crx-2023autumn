import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/content/element-plus.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Content from '@/content/content.vue'

// 创建id为CRX-container的div
const crxApp = document.createElement('div')
crxApp.id = 'CRX-container'
// 将刚创建的div插入body最后
document.body.appendChild(crxApp)

// 创建Vue APP
const app = createApp(Content)
// 集成Element Plus
app.use(ElementPlus, {
    locale: zhCn,
})
// 将Vue APP插入刚创建的div
app.mount('#CRX-container')

// 向目标页面驻入js
try {
    let insertScript = document.createElement('script')
    insertScript.setAttribute('type', 'text/javascript')
    insertScript.src = window.chrome.runtime.getURL('insert.js')
    document.body.appendChild(insertScript)
} catch (err) {}

// 引入mock.js，不使用时注释掉，build前要注释掉
// import '@/mock'
/*global chrome*/

// 请求服务器地址（开发环境模拟请求地址）
let API_DOMAIN = '/api/'
// 请求服务器地址（正式build环境真实请求地址）
if (import.meta.env.MODE === 'production') {
    API_DOMAIN = 'http://localhost/api/'
}

// API请求正常，数据正常
export const API_CODE = {
    // API请求正常
    OK: 200,
    // API请求正常，数据异常
    ERR_DATA: 403,
    // API请求正常，空数据
    ERR_NO_DATA: 301,
    // API请求正常，登录异常
    ERR_LOGOUT: 401,
}
// API请求异常报错内容
export const API_FAILED = '网络连接异常，请稍后再试'

// API请求汇总
export const apiReqs = {
    // 登录
    signIn: (config) => {
        config.url = API_DOMAIN + 'login/'
        config.method = 'post'
        apiFetch(config)
    },
    // 获取数据
    getData: (config) => {
        config.url = API_DOMAIN + 'getData/'
        config.method = 'get'
        apiFetch(config)
    },
    // 委托background提交数据
    submitByBackground: (config) => {
        config.background = true
        config.url = API_DOMAIN + 'submit/'
        config.method = 'post'
        apiFetch(config)
    },
}

// 发起请求
function apiFetch(config) {
    if (config.background && import.meta.env.MODE === 'production') {
        // [适用于build环境的content script]委托background script发起请求，此种方式只能传递普通json数据，不能传递函数及file类型数据。
        sendRequestToBackground(config)
    } else {
        // [适用于popup及开发环境的content script]发起请求
        apiRequest(config)
    }
}

/*
 * API请求封装（带验证信息）
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */
export function apiRequest(config) {
    // 如果没有设置config.data，则默认为{}
    if (config.data === undefined) {
        config.data = {}
    }

    // 如果没有设置config.method，则默认为post
    config.method = config.method || 'post'

    // 请求头设置
    let headers = {}
    let data = null

    if (config.formData) {
        // 上传文件的兼容处理，如果config.formData=true，则以form-data方式发起请求。
        // fetch()会自动设置Content-Type为multipart/form-data，无需额外设置。
        data = new FormData()
        Object.keys(config.data).forEach(function (key) {
            data.append(key, config.data[key])
        })
    } else {
        // 如果不长传文件，fetch()默认的Content-Type为text/plain;charset=UTF-8，需要手动进行修改。
        headers['Content-Type'] = 'application/json;charset=UTF-8'
        data = JSON.stringify(config.data)
    }

    // 准备好请求的全部数据
    let axiosConfig = {
        method: config.method,
        headers,
        body: data,
    }

    // 发起请求
    fetch(config.url, axiosConfig)
        .then((res) => res.json())
        .then((result) => {
            // 请求结束的回调
            config.done && config.done()
            // 请求成功的回调
            config.success && config.success(result)
        })
        .catch(() => {
            // 请求结束的回调
            config.done && config.done()
            // 请求失败的回调
            config.fail && config.fail(API_FAILED)
        })
}

// 委托background执行请求
function sendRequestToBackground(config) {
    // chrome.runtime.sendMessage中只能传递JSON数据，不能传递file类型数据，因此直接从popup发起请求。
    // The message to send. This message should be a JSON-ifiable object.
    // 详情参阅：https://developer.chrome.com/extensions/runtime#method-sendMessage
    if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage(
            {
                // 带上标识，让background script接收消息时知道此消息是用于请求API
                contentRequest: 'apiRequest',
                config: config,
            },
            (result) => {
                // 接收background script的sendResponse方法返回的消数据result
                config.done && config.done()
                if (result.result === 'succ') {
                    config.success && config.success(result)
                } else {
                    config.fail && config.fail(result.msg)
                }
            }
        )
    } else {
        console.log('未找到chrome API')
    }
}

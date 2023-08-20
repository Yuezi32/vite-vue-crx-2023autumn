<script setup>
import { useRoute, useRouter } from 'vue-router'
// route钩子，返回当前的路由地址
const route = useRoute()
// router钩子，返回路由器实例
const router = useRouter()
// 获取当前路由path
const path = route.path
// Tab组件控制路由跳转
const onTabChange = (gotoPath) => {
    router.push(gotoPath)
}

// 退出到Login页面
const onExit = () => {
    router.push('/login')
}
</script>

<template>
    <div class="M-nav">
        <el-tabs
            v-model="path"
            class="top-nav"
            @tab-change="onTabChange"
            stretch
        >
            <el-tab-pane label="Home" name="/home"></el-tab-pane>
            <el-tab-pane label="Account" name="/account"></el-tab-pane>
        </el-tabs>
        <el-button type="primary" class="btn-exit" @click="onExit">退出</el-button>
    </div>
</template>

<style scoped lang="stylus">
.M-nav
    position: relative
    z-index: 999
    background: #fff
    .top-nav
        margin:0 auto
        padding-bottom: 1px
        width: 200px
        :deep(.el-tabs__header)
            margin-bottom: 0
    .btn-exit
        position: absolute
        top: 4px
        right: 6px
</style>
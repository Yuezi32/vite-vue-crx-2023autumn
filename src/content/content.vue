<script setup>
import {ref} from 'vue'
import MainDialog from '@/content/components/mainDialog/mainDialog.vue'

// 对话框显示状态
const isShowMainDialog = ref(false)

</script>

<template>
    <el-config-provider namespace="CRX-el">
        <div class="CRX-content">
            <div class="content-entry" @click="isShowMainDialog = true"></div>
            <MainDialog
                :visible="isShowMainDialog"
                @onClose="() => {isShowMainDialog = false}"
            />
        </div>
    </el-config-provider>
</template>

<style scoped lang="stylus">
.CRX-content
    .content-entry
        position: fixed
        z-index: 9999
        bottom: 100px
        right: 20px
        width: 50px
        height: 50px
        background: url('images/content-icon.png')
        background-size: 100% 100%
        cursor: pointer
</style>

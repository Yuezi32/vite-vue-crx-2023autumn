<script setup>
import { ref, computed } from 'vue'
import { apiReqs } from '@/api'
// 接受父组件传递的方法
const emit = defineEmits(['onClose'])
// 接收父组件传递的参数
const props = defineProps(['visible'])

// 输入框中的内容
const text = ref('')

// 是否显示对话框
const isVisible = computed({
    get() {
        return props.visible
    },
    set() {
        // 关闭对话框的时候，会触发对isVisible=false的修改
        // 通知父组件将对话框显示状态设置为false
        emit('onClose')
    },
})

// 提交
const submit = () => {
    apiReqs.submitByBackground({
        data: {
            text: text.value,
        },
        success: (res) => {
            console.log(res)
        },
        fail: (res) => {
            alert(res)
        },
    })
}
</script>

<template>
    <el-dialog
        v-model="isVisible"
        v-if="isVisible"
        title="CRX对话框"
        width="600"
    >
        <div class="main-content-con">
            <div class="item-con">
                <el-input v-model="text" placeholder="" />
            </div>
        </div>
        <template #footer>
            <el-button type="primary" @click="submit"> Submit </el-button>
        </template>
    </el-dialog>
</template>

<style scoped lang="stylus"></style>

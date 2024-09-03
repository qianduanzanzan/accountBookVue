<template>
    <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '100%' }"
    >
        <customerNavbar>
            <div class="grid2">
                <div>
                    <span @click="activeIndex = 0" class="item f-w600 mb-4" :class="activeIndex == 0 ? 'active' : ''">
                        收入
                    </span>
                </div>
                <div>
                    <span @click="activeIndex = 1" class="item f-w600 mb-4" :class="activeIndex == 1 ? 'active' : ''">
                        支出
                    </span>
                </div>
            </div>
            <template #right>
                <div @click="show = false">取消</div>
            </template>
        </customerNavbar>
        <div>123456789</div>
    </van-popup>
</template>

<script setup>
import customerNavbar from '@/components/customerNavbar/index.vue'
import { ref } from 'vue';

const show = ref(false)

const activeIndex = ref(0)

const showPopup = () => {
    show.value = true
}

defineExpose({ showPopup })
</script>

<style scoped lang="less">
.grid2{
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.item{
    position: relative;
    &::after{
        position: absolute;
        content: ' ';
        width: 100%;
        bottom: -8px;
        left: 0;
    }
    &.active{
        color: #409eff;
        &::after{
            border-bottom: 2px solid #409eff;
        }
    }
}
</style>

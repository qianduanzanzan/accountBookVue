<template>
    <div class="h46"></div>
    <div class="h46 header">
        <div class="text-a-l">
            <slot name="left">
                <div>&nbsp;</div>
            </slot>
        </div>
        <div class="text-a-c">
            <slot>
                <div class="f-w600">{{ title }}</div>
            </slot>
        </div>
        <div class="text-a-r">
            <slot name="right">
                <div>&nbsp;</div>
            </slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style scoped lang="less">
.h46{
    height: 46px;
}
.header{
    border-bottom: 1px solid #ccc3;
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0 8px;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    text-align: center;
    justify-content: space-between;
}
</style>

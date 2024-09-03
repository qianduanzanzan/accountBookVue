<template>
    <div class="h60"></div>
    <div class="tabbar h60 not_trigger" @click="toPage">
        <div class="tabbar-item trigger_self" data-name="details">
            <svgIcon :name="routeName == 'details' ? 'svg-detailsActive' : 'svg-details'" className="fs-6" />
            <div class="fs-1 mt-2" :class="routeName == 'details' ? 'c-main' : 'c-grey'">明细</div>
        </div>
        <div class="tabbar-item trigger_self" data-name="chart">
            <svgIcon :name="routeName == 'chart' ? 'svg-chartActive' : 'svg-chart'" className="fs-6" />
            <div class="fs-1 mt-2" :class="routeName == 'chart' ? 'c-main' : 'c-grey'">图表</div>
        </div>
        <div class="pos-r tabbar-item">
            <div class="add pos-a trigger_self" data-name="add">
                <svgIcon className="fs-15" name="svg-add" />
            </div>
            <div>&nbsp;</div>
            <div class="fs-1 mt-2 c-grey text-a-c">记账</div>
        </div>
        <div class="tabbar-item trigger_self" data-name="current">
            <svgIcon :name="routeName == 'current' ? 'svg-currentActive' : 'svg-current'" className="fs-6" />
            <div class="fs-1 mt-2" :class="routeName == 'current' ? 'c-main' : 'c-grey'">本月</div>
        </div>
        <div class="tabbar-item trigger_self" data-name="mine">
            <svgIcon :name="routeName == 'mine' ? 'svg-mineActive' : 'svg-mine'" className="fs-6" />
            <div class="fs-1 mt-2" :class="routeName == 'mine' ? 'c-main' : 'c-grey'">我的</div>
        </div>
    </div>
</template>

<script setup>
import svgIcon from '@/components/SvgIcon/index.vue'
import { useRoute,useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const routeName = computed(() => {
    return route.name;
})

const emit = defineEmits(['addAccountBook'])

const toPage = (e) => {
    e.stopPropagation();

    if(e.target.dataset.name == 'add'){
        emit('addAccountBook')
        return
    }
    if(routeName.value == e.target.dataset.name){
        return;
    }
    router.push({ name: e.target.dataset.name })
}

</script>

<style scoped lang="less">
.tabbar{
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(5,1fr);
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ccc3;
    .tabbar-item{
        text-align: center;
    }

    .add{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background-color: #f4ea2a;
        top: 0;
        left: 50%;
        transform: translate(-50%,-70%);
    }
}

.h60{
    height: 60px;
}
</style>

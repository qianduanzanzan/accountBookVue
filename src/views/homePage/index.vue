<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="['details','current','mine','chart']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <customerTabbar @addAccountBook="openAddAccountBookPopup" />
  <addAccountBookPopup ref="addAccountBookPopupRef" />
</template>

<script setup>
import customerTabbar from '@/components/customerTabbar/index.vue'
import addAccountBookPopup from './components/addAccountBookPopup.vue'
import { ref } from 'vue'

const addAccountBookPopupRef = ref(null)
const openAddAccountBookPopup = () => {
    addAccountBookPopupRef.value.showPopup()
}
</script>

<style lang="less" scoped>
@import "@/styles/mixin.less";
</style>

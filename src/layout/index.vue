<script setup>
import { useCachedViewStore } from "@/store/modules/cachedView";
import { computed } from "vue";

const cachedViews = computed(() => {
  return useCachedViewStore().cachedViewList;
});
</script>

<template>
  <div class="app-wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>

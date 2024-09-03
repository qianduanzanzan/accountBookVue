<template>
	<van-field :modelValue="modelValue" readonly is-link :required="props.required" :label="props.label" :placeholder="props.placeholder" @click="showPicker = true" />
	<van-popup teleport="body" :z-index="4000" v-model:show="showPicker" position="bottom">
		<van-date-picker
            @confirm="onConfirm"
            v-model="selectedDate"
            title="选择日期"
        />
	</van-popup>
</template>

<script setup>
import { ref, watch } from "vue";

const showPicker = ref(false);
const selectedDate = ref('');
const props = defineProps({
	modelValue: {
		default: ""
	},
	placeholder: {
		type: String,
		default: "请选择"
	},
	label: {
		type: String,
		default: "选择器"
	},
	required: {
		type: Boolean,
		default: false
	},
});

watch(() => props.modelValue,(val) => {
    const arr = val.split('-')
    selectedDate.value = arr
})

const emit = defineEmits(["update:modelValue",'change']);

const onConfirm = (data) => {
    emit('update:modelValue',data.selectedValues.join('-'))
	showPicker.value = false;
};
</script>

<style scoped lang="less">
.multiple-picker-column{
    width: 100%;
    padding: 20px 10px;
    overflow: auto;
}
.grid{
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    align-items: center;
    justify-content: center;
}
.isSelected{
    color: #409eff;
}
</style>

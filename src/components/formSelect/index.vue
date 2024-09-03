<template>
	<van-field v-model="showLabel" readonly is-link :required="props.required" :label="props.label" :placeholder="props.placeholder" @click="showPicker = true" />
	<van-popup teleport="body" :z-index="4000" v-model:show="showPicker" position="bottom">
		<van-picker v-if="!props.multiple" :title="props.label" :columns="showOptions" :columns-field-names="customFieldName" @confirm="onConfirm" @cancel="showPicker = false">
			<template v-if="props.filterable" #title>
				<input style="flex:1" :placeholder="props.searchPlaceholder" :value="searchText" @input="setSearchKey" type="text" />
			</template>
		</van-picker>
		<div v-else>
			<div class="van-picker">
				<div class="van-picker__toolbar">
					<button @click="showPicker = false" type="button" class="van-picker__cancel van-haptics-feedback">取消</button>
					<div class="van-picker__title van-ellipsis">{{ props.label }}</div>
					<button type="button" @click="onConfirm" class="van-picker__confirm van-haptics-feedback">确认</button>
				</div>
				<div class="van-picker__columns" style="height: 264px">
					<div class="multiple-picker-column">
						<ul style="transition-duration: 0ms; transition-property: none">
							<li @click="selectRow(item)" v-for="item in showOptions" :key="item[props.valueKey]" role="button" tabindex="0" class="van-picker-column__item grid" style="height: 44px">
                                <div></div>
                                <div style="text-align: center;" class="van-ellipsis" :class="{isSelected: multipleObj[item[valueKey]]}">{{ item[labelKey] }}</div>
                                <div><van-icon color="#409eff" v-if="multipleObj[item[valueKey]]" name="certificate" /></div>
                            </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</van-popup>
</template>

<script setup>
import { ref, computed,watch } from "vue";
import { debounce } from '@/utils/tools.js';

const showPicker = ref(false);
const searchText = ref("");
const props = defineProps({
	modelValue: {
		default: ""
	},
	placeholder: {
		type: String,
		default: "请选择"
	},
	options: {
		type: Array,
		default: () => []
	},
	label: {
		type: String,
		default: "选择器"
	},
	labelKey: {
		type: String,
		default: "configName"
	},
	valueKey: {
		type: String,
		default: "configValue"
	},
	required: {
		type: Boolean,
		default: false
	},
	filterable: {
		type: Boolean,
		default: false
	},
	multiple: {
		type: Boolean,
		default: false
	},
	remote: {
		type: Boolean,
		default: false
	},
	remoteMethod: {
		type: Function,
		default: () => {}
	},
	valLabel: {
		type: String,
		default: ''
	},
	searchPlaceholder: {
		type: String,
		default: "请输入关键词筛选"
	}
});
const multipleObj = ref({})
const customFieldName = {
	text: props.labelKey,
	value: props.valueKey
};

const getMultipleObj = () => {
    multipleObj.value = {}
    if(Array.isArray(props.modelValue) && props.modelValue.length > 0 && Array.isArray(props.options) && props.options.length > 0 ){
        for (let index = 0; index < props.options.length; index++) {
            const item = props.options[index];
            if(props.modelValue.includes(item[props.valueKey])){
                multipleObj.value[item[props.valueKey]] = item
            }
        }
    }
}
watch(() => props.modelValue, () => {
    getMultipleObj()
},{
    immediate: true
})

watch(() => props.options, () => {
    getMultipleObj()
},{
    immediate: true
})

const emit = defineEmits(["update:modelValue",'change']);
const showLabel = computed(() => {
	if(props.valLabel) return props.valLabel
    if(props.multiple){
        if(Array.isArray(props.modelValue) && props.modelValue.length > 0){
            let labelArr = []
            props.options.forEach(item => {
                if(props.modelValue.includes(item[props.valueKey])){
                    labelArr.push(item[props.labelKey])
                }
            })
            return labelArr.join(',')
        }
        return ''
    }
	const option = props.options.find(item => item[props.valueKey] === props.modelValue);
	if (option) {
		return option[props.labelKey];
	}
	return "";
});
const showOptions = computed(() => {
	if (!props.filterable || props.remote) return props.options;
	const value = searchText.value.trim();
	return props.options.filter(item => item[props.labelKey].includes(value));
});

const onConfirm = ({ selectedOptions }) => {
    if(props.multiple){
        const valArr = []
		const labelArr = []
        Object.values(multipleObj.value).forEach(item => {
            if(item){
                valArr.push(item[props.valueKey])
				labelArr.push(item[props.labelKey])
            }
        })
        emit("update:modelValue", valArr);
		emit("change", {
			value: valArr,
			label: labelArr.join(',')
		});
    }else{
        if (selectedOptions && selectedOptions[0]) {
            emit("update:modelValue", selectedOptions[0][props.valueKey]);
			emit("change", {
				value: selectedOptions[0][props.valueKey],
				label: selectedOptions[0][props.labelKey]
			});
        } else {
            emit("update:modelValue", "");
			emit("change", {
				value: '',
				label: ''
			});
        }
    }
	showPicker.value = false;
};
const selectRow = (data) => {
    if(multipleObj.value[data[props.valueKey]]){
        multipleObj.value[data[props.valueKey]] = false
    }else{
        multipleObj.value[data[props.valueKey]] = data
    }
}

const setSearchKey = debounce((e) => {
	const val = e.target.value
    searchText.value = val
	if(props.remoteMethod instanceof Function){
		props.remoteMethod(val)
	}
}, 500)

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

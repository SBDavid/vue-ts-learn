<template>
  <el-form>
    <el-form-item label="城市省份">
      <template v-for="sc in schemeMap">
        <el-col :span="12">
          <el-select 
          @change="sc[1].value['$onchange']" 
          :disabled="sc[1].value['disabled']" 
          clearable 
          :modelValue="modelMap.get(sc[0])?.value" 
          @update:modelValue="(newValue: string) => {
            if (modelMap.get(sc[0]) !== undefined) {
              (modelMap.get(sc[0]) as Ref).value = newValue
            }
          }" 
          :placeholder="sc[1].value.placeholder">
            <el-option v-for="option in sc[1].value.options" :label="option.label" :value="option.value" />
          </el-select>
        </el-col>
      </template>
    </el-form-item>
    
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, onMounted, type Ref, ref } from 'vue';

const schemeJson = [
  {
    key: 'select1',
    type: 'select',
    placeholder: "please select your select1",
    disabled: false,
    options: [
      {label: '省份1', value: '省份1'},
      {label: '省份2', value: '省份2'}
    ],
    onGlobalOnChange: () => {

    }
  },
  {
    key: 'select2',
    type: 'select',
    placeholder: "please select your select2",
    disabled: false,
    options: [],
    onGlobalOnChange: (srcKey: string, scrVal: string, modelMap: Map<string, Ref<any>>, schemeMap: Map<string, Ref<any>>) => {
      if (srcKey === 'select1') {
        const model = modelMap.get('select2') as Ref;
        model.value = undefined;
      }

      const scheme = schemeMap.get('select2') as Ref;
      if (srcKey === 'select1' && scrVal === '省份1') {
        scheme.value['disabled'] = true;
        scheme.value['options'] = [
          {label: '城市1', value: '城市1'},
          {label: '城市2', value: '城市2'}
        ];
      } else {
        scheme.value['disabled'] = false;
        scheme.value['options'] = [
          {label: '城市3', value: '城市3'},
          {label: '城市4', value: '城市4'}
        ];
      }
    }
  }
];

// const schemeMap = reactive<{[key: string]: any}>({});
// const modelMap = reactive<{[key: string]: any}>({});
// 不使用reactive包裹，页面就无法更行了
// 内部要使用ref，否则会失去响应式链接
const schemeMap = reactive(new Map<string, Ref<any>>());
const modelMap = reactive(new Map<string, Ref<any>>());

const genScheme = () => {
  schemeJson.map(s => {
    // scheme
    const scheme = ref(s);
    // @ts-ignore
    scheme.value["$onchange"] = (val: string) => {
      globalOnChange(s.key, val)
    }
    schemeMap.set(s.key, scheme);

    // model
    const model = ref(undefined);
    modelMap.set(s.key, model);
  });
}

const globalOnChange = (srcKey: string, scrVal: string) => {
  schemeMap.forEach(sc => {
    sc.value['onGlobalOnChange'](srcKey, scrVal, modelMap, schemeMap);
  })
}

onMounted(() => {
  genScheme()
});

// watch(scheme, () => {console.info('scheme', scheme)})
// watch(model, () => {console.info('model', model)})
</script>
<template>
  <el-form>
    <el-form-item label="城市省份">
      <template v-for="sc in schemeMap">
        <el-col :span="12">
          <el-select @change="sc['$onchange']" :disabled="sc['disabled']" clearable v-model="modelMap[sc.key]" :placeholder="sc.placeholder">
            <el-option v-for="option in sc.options" :label="option.label" :value="option.value" />
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
    onGlobalOnChange: (srcKey: string, scrVal: string, model: Ref<string>) => {

    }
  },
  {
    key: 'select2',
    type: 'select',
    placeholder: "please select your select2",
    disabled: false,
    options: [],
    onGlobalOnChange: (srcKey: string, scrVal: string, modelMap: {[key: string]: any}, schemeMap: {[key: string]: any}) => {
      if (srcKey === 'select1') {
        modelMap['select2'] = undefined;
      }

      if (srcKey === 'select1' && scrVal === '省份1') {
        schemeMap['select2']['disabled'] = true;
        schemeMap['select2']['options'] = [
          {label: '城市1', value: '城市1'},
          {label: '城市2', value: '城市2'}
        ];
      } else {
        schemeMap['select2']['disabled'] = false;
        schemeMap['select2']['options'] = [
          {label: '城市3', value: '城市3'},
          {label: '城市4', value: '城市4'}
        ];
      }
    }
  }
];

const schemeMap = reactive<{[key: string]: any}>({});
const modelMap = reactive<{[key: string]: any}>({});

const genScheme = () => {
  schemeJson.map(s => {
    // scheme
    const scheme = ref(s);
    // @ts-ignore
    scheme.value["$onchange"] = (val: string) => {
      globalOnChange(s.key, val, modelMap, schemeMap)
    }
    schemeMap[s.key] = scheme;

    // model
    const model = ref(undefined);
    modelMap[s.key] = model;
  });
}

const globalOnChange = (srcKey: string, scrVal: string, modelMap: {[key: string]: any}, schemeMap: {[key: string]: any}) => {
  for (let sc in schemeMap) {
    schemeMap[sc]['onGlobalOnChange'](srcKey, scrVal, modelMap, schemeMap);
  }
}

onMounted(() => {
  genScheme()
});

// watch(scheme, () => {console.info('scheme', scheme)})
// watch(model, () => {console.info('model', model)})
</script>
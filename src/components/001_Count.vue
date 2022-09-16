<script lang="ts" setup>
import { reactive, ref, computed, 
onMounted, onUpdated, onBeforeUpdate, 
watch, onRenderTracked, onRenderTriggered } from 'vue'

interface State {
  count: number
}

const state: State = reactive({
  count: 0
});

// 1. 测试 ref
const stateRef = ref(0);

function increment() {
  state.count++
  stateRef.value++
}

// 2. 测试计算属性
const computedStateCount = computed(() => {
  return state.count + 2
})
const computedStateRefCount = computed(() => {
  return stateRef.value + 2
})

// 3. 内连样式
const styleRed = ref('red');
const styleObject = reactive({
  color: 'red',
  fontSize: '19px'
})

// 4. 表单学习
const editText = ref('initVal')

// 5. 生命周期方法
onBeforeUpdate(() => {
  // console.log('onBeforeUpdate')
})
onUpdated(() => {
  // console.log('onUpdated')
})
onMounted(() => {
  // console.log(`the component is now mounted. 1`)
})

// 6. 监听器
watch(state, (newVal, oldVal) => {
  console.info('watch state', newVal.count, oldVal.count)
})
watch(stateRef, (newVal, oldVal) => {
  console.info('watch stateRef', newVal, oldVal)
})

// 7. 传递 props
const props = defineProps<{title: String}>()

// 11. 组件调试钩子
onRenderTracked((event) => {
  // debugger
})

onRenderTriggered((event) => {
  // debugger
})

</script>

<template>
  <button @click="increment">You clicked me {{ state.count }} times. stateRef: {{stateRef+1}}</button>
  <div 
    :class="$attrs.class"
    :style="styleObject"
    >
    computedStateCount: {{computedStateCount}}
  </div>
  <div
    :style="{color: styleRed}"
    >
    computedStateRefCount: {{computedStateRefCount}}
  </div>
  <div>
    <p>{{editText}}</p>
    <input v-model="editText" />
  </div>
  <div>
    <p>通过props传递标题 {{props.title}}</p>
  </div>
</template>

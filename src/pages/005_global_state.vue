<template>
  {{ user }}
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { defineStore, globalSymbol} from '../globalState'

export default defineComponent({
  mounted() {
    // @ts-ignore
    console.info('$globalStore', this.$globalStore.state.value.testStore)
    // @ts-ignore
    window.$globalStore = this.$globalStore
    // @ts-ignore
    this.$globalStore.state.value.testStore.actions.change()
  },
  setup() {
    defineStore('testStore', {
      state: {
        user: 'use1'
      },
      actions: {
        change: function() {
          // @ts-ignore
          this.value.user = '111'
        }
      }
    })

    const globalStore = inject(globalSymbol)

    return {
      // @ts-ignore
      user: globalStore.state.value.testStore.state
    }
  }
})
</script>
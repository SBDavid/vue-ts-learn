<template>
  <router-view v-slot="{ Component }">
    <transition>
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </transition>
  </router-view>
  <div>
    <div v-for="index of Array.from(Array(globalComponentAmount).keys())">
      <slot :name="'globalComponent'+(index)"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Transition, defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  props: {
    globalComponentAmount: {
      type: Number
    }
  },
  setup: () => {

  },
  components: {
    Transition
  }
})
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}

.v-enter-active {
  transition: opacity 0.5s ease;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
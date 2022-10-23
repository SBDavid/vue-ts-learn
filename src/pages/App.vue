<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
    <UseOffsetPaginationPage />
    <Count :class='{"test-class-name": true}' title="my-title" />
    <div :style="{fontSize: postFontSize + 'em'}">
      <TestList
        v-for="data in listData"
        :id="data.id"
        :title="data.title"
        :giveANum=44
        @enlarge-text="enlargeText"
      />
    </div>
    <RenderFunc />
    <TestSlot />
    <AsyncComponent />
    <TestSetup title="myTitle" />
    <TestListLoadMore />
    <TestListLoadMoreComposable />
    <WatchVsWatchEffect />
    <TestPinia />
    <TestPinia2 />
  </main>
</template>

<script setup lang="ts">
import { ref, isVNode, h } from 'vue';

import HelloWorld from '../components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'
import Count from '../components/001_Count.vue'
import TestList from '../components/002_TestList.vue'
import RenderFunc from '../components/003_RenderFunc';
import TestSlot from '../components/004_slot';
import AsyncComponent from '../components/006_defineAsyncComponent';
import TestSetup from '../components/007_testSetup';
import { TestListLoadMore } from '../components/009_listLoadMore';
import { TestListLoadMoreComposable } from '../components/009_listLoadMoreComposable';
import WatchVsWatchEffect from '../components/010_watchVsWatchEffect';
import TestPinia from '../components/011_testPinia';
import TestPinia2 from '../components/011_testPinia2';
import UseOffsetPaginationPage from '../components/012_useOffsetPaginationPage.vue';

// 8. 渲染泪飙
const listData = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
]);

// 9. 发送事件
const postFontSize = ref(1);
const enlargeText = function() {
  postFontSize.value += 0.1
}

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

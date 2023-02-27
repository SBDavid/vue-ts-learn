<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const DataService = {
  cache: new Map<String, {
    state: 'init' | 'loading' | 'success'
    data?: any
    callbacks: Array<(data: any) => void>
  }>(),

  state: '',

  async $fetch(url: String, option: {
    method: 'get' | 'post'
    body?: any
  }) {
    const cached = this.cache.get(url)
    if (cached && cached.state === 'success') {
      return cached.data
    }

    let callback = (data: any) => {}
    const responsePromise = new Promise<any>((r) => {
      callback = r
    })

    if (!cached) {
      this.cache.set(url, {
        state: 'init',
        callbacks: [callback]
      })
    }

    if (cached) {
      cached.callbacks.push(callback)
    }

    this.flush()

    return responsePromise
  },

  async flush() {
    setTimeout(() => {
      for( const [key, value] of this.cache ) {
        if (value.state === 'init') {
          console.info('start loading', key)
          value.state = 'loading'

          setTimeout(() => {
            value.state = 'success'
            value.callbacks.forEach(cb => cb('response: ' + key))
            value.callbacks = []
          } , 1000)
        }
      }
    })
  },

  clean() {}
}

export default defineComponent({
  setup() {
    console.info('008_data_service')
    DataService.$fetch('url/get', { method: 'get'}).then(res => {
      console.info('url/get 1', res)
    })
    DataService.$fetch('url/get', { method: 'get'}).then(res => {
      console.info('url/get 2', res)
    })
    DataService.$fetch('url/post', { method: 'post'}).then(res => {
      console.info('url/post 2', res)
    })
  }
})
</script>
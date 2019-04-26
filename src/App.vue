<template>
  <div id="app">
    <SilderMenu />
  </div>
</template>

<script>
import SilderMenu from './components/SilderMenu.vue'

export default {
  name: 'app',
  components: {
    SilderMenu
  }
}
</script>

<style lang='stylus'>
#app
  width 100%
  height 100%
</style>

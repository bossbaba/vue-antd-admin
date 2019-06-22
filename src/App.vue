<template>
  <div id="app">
    <SideMenu />
    <div class="router-view">
      <router-view/>
    </div>
  </div>
</template>
<script>
import SideMenu from '@/components/SideMenu.vue'
export default { 
  components: {
    SideMenu
  }
}
</script>
<style lang="stylus">
#app
  width 100%
  height 100%
  display flex
  .router-view
    width 100%
    height 100%
    width calc(100% - 250px)
    overflow auto
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6
  margin 0
  padding 0

h1,
h2,
h3,
h4,
h5,
h6
  font-size 100%
  font-weight normal

ul
  list-style none

button,
input,
select,
textarea
  margin 0

html
  box-sizing border-box

*, *:before, *:after
  box-sizing inherit

img,
embed,
iframe,
object,
video
  height auto
  max-width 100%

audio
  max-width 100%

iframe
  border 0

table
  border-collapse collapse
  border-spacing 0

td,
th
  padding 0
  text-align left
</style>

<template>
  <div class="antvcharts">
    <div class="wrap">
      <div class="tips">
      <li>不推荐使用antv，因为数据格式太混乱了</li>
    </div>
    <antVCharts/>
    </div>
  </div>
</template>

<script>
import antVCharts from '@/components/antVCharts.vue'
export default {
  components:{
    antVCharts
  }
}
</script>

<style lang='stylus' scoped>
.antvcharts
  box-sizing border-box
  padding 10px
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%
  .wrap
    width 100%
    height 500px
    display flex
    justify-content space-between
    align-items center
    flex-direction column
</style>

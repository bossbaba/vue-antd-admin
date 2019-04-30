<template>
  <div class="charts">
    <div class="charts-dome" v-for="(item,index) of Data" :key="index">
      <Charts :option='item.option'/>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Charts.vue'
import ArrOption from "@/data/data.js";
export default {
  name: "home",
  components:{
    Charts
  },
  data() {
    return {
      Data: ArrOption
    };
  },
  created() {
    console.log(this.Data)
  },
};
</script>
<style lang="stylus" scoped>
.charts 
  background: #f5f5f5;
  padding: 12px;
  display flex
  justify-content space-between
  flex-wrap  wrap
  .charts-dome
    margin 20px

</style>


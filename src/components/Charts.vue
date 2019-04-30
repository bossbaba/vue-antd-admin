<template>
  <div class="echarts-card">
    <div ref="echartsDome" class="echart-dome"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      Data: Arroption
    };
  },
  props:{
    option:{
      type:Object
    }
  },
  mounted() {
    let myChart = echarts.init(this.$refs.echartsDome);
    myChart.setOption(this.option);
  }
};
</script>

<style lang='stylus'>
.echarts-card {
    border-radius: 8px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    width: fit-content;
    background: #fff;
    padding: 10px;

    .echart-dome {
      min-width: 700px;
      height: 300px;
    }
  }
</style>

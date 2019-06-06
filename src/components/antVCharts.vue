<template>
  <div class="antv">
    <div id="c1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 }
      ]
    };
  },
  mounted() {
    const chart = new G2.Chart({
      container: "c1", // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300 // 指定图表高度
    });
    // Step 2: 载入数据源
    chart.source(this.data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart
      .interval()
      .position("genre*sold")
      .color("genre");
    // Step 4: 渲染图表
    chart.render();
  }
};
</script>

<style lang='stylus' scoped>
.antv
  border 1px solid #ccc
  width 700px
  height 300px
  box-shadow 1px 1px 1px rgba(0, 0, 0, 0.2)
  border-radius 4px
  display flex
  justify-content center
  align-items center
</style>

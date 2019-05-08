<template>
  <div class="usermanagement">
    <a-table
      :filteredValue="checkArray"
      :filterMultiple="true"
      align="center"
      bordered
      :dataSource="data"
      :columns="columns"
      :rowKey="data=>data.id"
    ></a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname"
  },
  {
    title: "注册时间",
    dataIndex: "regtime",
    key: "regtime"
  }
];
import Charts from "@/components/Charts.vue";
export default {
  components: {
    Charts
  },
  data() {
    return {
      option: {
        title: {
          text: "ECharts 基础折线图"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "降雨量",
            data: [820, 932, 901, 934],
            type: "line"
          }
        ]
      },
      checkArray: [],
      data: [],
      columns: columns
    };
  },
  mounted() {
    this.$http.get("/api/alluser").then(resp => {
      this.data = resp.data.data;
    });
  }
};
</script>

<style lang='stylus'>
.usermanagement {
  padding: 10px;
  background: #f5f5f5;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>

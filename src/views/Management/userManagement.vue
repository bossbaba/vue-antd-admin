<template>
  <div class="user-manag">
    
   <div class="antd-table-content">
      <a-table :columns="columns" :dataSource="data" bordered :rowKey="id=>data.id">
      <template v-for="col in ['name', 'age', 'nickname']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a-popconfirm title="确认退出吗？" @confirm="() => cancel(record.key)">
              <a>退出</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">编辑</a>
          </span>
          <span>
            <a @click="() => del(record.key)">删除</a>
          </span>
        </div>
      </template>
    </a-table>
   </div>
   <div class="charts-total">
      <div class="user-charts" ref="userCharts"></div>
      <div class="title">五日会员新增数目</div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    scopedSlots: { customRender: "age" },
    key: "age"
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    scopedSlots: { customRender: "nickname" },
    key: "nickname"
  },
  {
    title: "注册时间",
    dataIndex: "regtime",
    scopedSlots: { customRender: "regtime" },
    key: "regtime"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    key: "operation"
  }
];
const option = {
  
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
      type: "line",
      areaStyle: {},
      smooth: true
    }
  ]
};
import echarts from "echarts";
export default {
  data() {
    return {
      data: [],
      columns,
      cacheData: [],
      option: option
    };
  },
  mounted() {
    let charts = this.$refs.userCharts;
    this.$http.get("/api/adduser").then(resp => {
      console.log(resp.data);
    });
    this.$http.get("/api/yesterdayaddcount").then(resp => {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
      resp.data.data.forEach(item => {
        this.option.xAxis.data.push(item.time);
        this.option.series[0].data.push(item.count);
      });
      let myChart = echarts.init(charts);
      myChart.setOption(this.option);
    });
    this.$http.get("/api/alluser").then(resp => {
      this.data = resp.data.data;
      this.data.forEach(item => {
        item.key = item.id;
      });
      this.cacheData = this.data.map(item => ({ ...item }));
    });
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
      this.data.forEach(element => {
        if (key === element.key) {
          this.$http
            .get("/api/updatauser", {
              params: {
                id: element.id,
                name: element.name,
                age: element.age,
                nickname: element.nickname
              }
            })
            .then(resp => {
              console.log(resp);
            });
        }
      });
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    del(key) {
      console.log(key);
      this.$http
        .get("/api/deleteuser", {
          params: {
            id: key
          }
        })
        .then(resp => {
          console.log(resp.data.data);
          if (resp.data.data.affectedRows === 1) {
            this.data = this.data.filter(ele => {
              if (ele.id === key) {
                return false;
              }
              return true;
            });
          }
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.user-manag {
  padding: 10px;
  .charts-total {
    width: 100%;
    height: 300px;
    .title{
      font-size 20px
      text-align center
    }
    .user-charts {
      width:40%;
      height: 100%;
      margin 0 auto;
    }
  }
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>
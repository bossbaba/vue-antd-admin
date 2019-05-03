<template>
  <div class="sidemenu">
    <a-menu
      :openKeys="openKeys"
      @openChange="onOpenChange"
      mode="inline"
      theme="dark"
      style="width:100%;height:100%;"
    >
      <a-menu-item @click="$router.push('/')">
        <a-icon type="code"/>
        <span>控制台</span>
      </a-menu-item>
      <a-sub-menu :title="item.name" v-for="item of AMenu" :key="item.id">
        <a-menu-item v-for="sitem of item.sunMenu" :key="sitem.id" @click="$router.push(sitem.routerLink)">
          <a-icon type="bars" />
          <span>{{sitem.name}}</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AMenu: [
        {
          id: 1,
          name: "管理",
          sunMenu: [
            {
              id: 1,
              name: "文章管理",
              routerLink: "/Management"
            },
            {
              id: 2,
              name: "消息管理",
              routerLink: "#"
            },
            {
              id: 3,
              name: "用户管理",
              routerLink: "/userManagement"
            }
          ]
        },
        {
          id: 2,
          name: "发布",
          sunMenu: [
            {
              id: 1,
              name: "发布文章",
              routerLink: "/issueDemand"
            },
            {
              id: 2,
              name: "发布通知",
              routerLink: "#"
            },
            {
              id: 3,
              name: "发布公告",
              routerLink: "#"
            }
          ]
        },{
          id: 10,
          name: "示例",
          sunMenu: [
            {
              id: 1,
              name: "图表示例",
              routerLink: "/ChartsDome"
            },
            {
              id: 2,
              name: "发布通知",
              routerLink: "#"
            },
            {
              id: 3,
              name: "发布公告",
              routerLink: "#"
            }
          ]
        }
      ],
      rootSubmenuKeys: [],
      openKeys: []
    };
  },
  created() {
    this.AMenu.forEach(ele => {
      ele.id = this.$fun.createGuId();
      this.rootSubmenuKeys.push(ele.id);
      ele.sunMenu.forEach(item => {
        item.id = this.$fun.createGuId();
      });
    });
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>

<style lang='stylus'>
.sidemenu {
  width: 250px;
  height: 100%;
}
</style>

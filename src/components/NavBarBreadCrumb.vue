<template>
<div>
  <a-breadcrumb :routes="routes">
    <template slot="itemRender" slot-scope="{route, params, routes, paths}">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{route.name}}
      </span>
      <router-link v-else :to="`${basePath}/${paths.join('/')}`">
        {{route.name}}
      </router-link>
    </template>
  </a-breadcrumb>
  <br/>
</div>
</template>
<script>
  import routesEntry from '@/routerEntry.js'
  export default {
    data(){
      const { lang } = this.$route.params?this.$route.params:''
      return {
         basePath: `/${lang}/`,
        routes: routesEntry,
      }
    },
    mounted () {
      routesEntry.forEach(element => {
        console.log(element)
      });
    }
  }
</script>
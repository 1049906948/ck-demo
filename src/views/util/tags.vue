<template>
  <basic-container>
    <h3>标签</h3>
    <el-button type="primary"
               size="small"
               @click="$router.push('/query/1')">打开一个页面</el-button>
    <el-button type="primary"
               size="small"
               @click="$router.$avueRouter.closeTag('/query/1')">关闭打开的页面</el-button>
    <el-button type="primary"
               size="small"
               @click="$router.$avueRouter.closeTag()">关闭本标签</el-button>

  </basic-container>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
</style>
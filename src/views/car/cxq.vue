<template>
  <div>
    <Header></Header>
    <div style="margin-top: 35px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>Car详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h2>车详情完善中...</h2>
  </div>
</template>
<!--车详情-->
<script>
import Header from '../../components/header'
export default {
  name: 'cxq',
  components: { Header }
}
</script>

<style scoped>
  a {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
</style>

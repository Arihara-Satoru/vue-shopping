<template>
  <div>
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="list-switching">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
export default {
  name: 'layoutIndex'
}
</script>

<style></style>

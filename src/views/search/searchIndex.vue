<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.replace('/home')" />

    <van-search @keydown.enter="handleSearch" v-model="searchData" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="handleSearch">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear()" name="delete-o" size="18" />
      </div>
      <div class="list" v-if="searchList.length>0">
        <div class="list-item" v-for="item in searchList" :key="item" @click="handleHistory(item)">{{ item }}<van-icon @click.stop="deleteItem(item)" name="cross" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchData: '',
      searchList: getSearchHistory()
    }
  },
  methods: {
    handleSearch () {
      this.searchList.unshift(this.searchData)
      setSearchHistory(this.searchList)
      this.$router.push(`/searchlist?search=${this.searchData}`)
    },
    handleHistory (item) {
      this.searchData = item
      this.searchList = this.searchList.filter(item => item !== this.searchData)
      this.handleSearch()
    },
    deleteItem (delitem) {
      this.searchList = this.searchList.filter(item => item !== delitem)
      setSearchHistory(this.searchList)
    },
    clear () {
      this.searchList = []
      setSearchHistory(this.searchList)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-nav-bar {
    z-index: 999;
    background-color: #c21401;
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    position: relative;
    .van-icon{
      position: absolute;
      font-size: 12px;
      top: 0;
      right: 0;
      padding: 7px;       /* 可调整图标与边界的间距 */
      z-index: 1;         /* 确保图标在内容上方 */
    }
  }
}
</style>

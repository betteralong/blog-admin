<template>
  <div class="container">
    <div class="title">文章列表</div>
    <div class="wrap">
      <ul class="article-list">
        <li class="article-list-item" v-for="(item, index) in artcleList" :key="index" @click="handleClick(item)"
          :style='{backgroundImage: "url("+ item.cover + ")"}' >
          <p class="article-title">{{item.title}}</p>
          <div class="article-brief">{{item.brief}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import artcle from '@/models/artcle'

export default {
  name: 'fiend',
  data() {
    return {
      artcleList: [],
    }
  },
  created() {
    console.log('test')
    this.getList()
  },
  methods: {
    handleClick (item) {
      this.$router.push({ path: '/article/detail', query: {
        id: item.id
      }})
    },
    async getList() {
      try {
        const res = await artcle.getArtcleList()
        this.artcleList = res
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }
  .wrap {
    padding: 20px;
    .article-list{
      display: flex;
      flex-wrap: wrap;
      .article-list-item{
        width: 300px;
        height: 200px;
        border-radius: 8px;
        cursor: pointer;
        background-size: 100% 100%;
        margin: 0 32px 20px 0;
        .article-title{
          text-align: center;
          font-size: 18px;
          padding: 10px;
          color: rgba(255,255,255,0.9);
        }
        .article-brief{
          padding: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
       error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in searchResults" :key="item.art_id">
        <template #title>
          <span v-html="item.title" @click="$router.push(`/detail/${item.art_id}`)"></span>
        </template>
        <template #icon>
          <van-icon name="search" class="search-icon"></van-icon>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api";
export default {
  data() {
    return {
       loading: false,//加载
      finished: false,//结束
      error:false,//错误
      searchResults: [], //搜索结果数组
      page: 1, //页数
      count: 20, //每页返回数量
    };
  },
  props: {
    keywords: {
      type: String,
      required: true,
    },
  },
  // watch: {
  //   //如果监听的是methods中的方法，可以简写
  //   keywords: {
  //     immediate: true,
  //     handler() {
  //       this.getSearchResults();
  //     },
  //   },
  // },
  computed: {
    //计算属性来实现渲染关键字的样式,覆盖原来的数据
    hightLightDate() {
      //把关键字 转为正则
      const reg = new RegExp(this.keywords, "ig");
      return this.searchResults.map((item) => {
        //让每一个请求返回的数据中内容 和正则比配的那一项 进行对应的操作
        return item.title.replace(reg, (match) => {
          return `<span style="color:red">${match}</span>`;
        });
      });
    },
  },
  methods: {
    async getSearchResults() {
      try {
        const {
        data: {
          data: { results },
        },
      } = await getSearchResults(this.page, this.count, this.keywords);
      this.searchResults = results;
      
      console.log(this.searchResults);
      } catch (error) {
        console.log(error);
      }
    },
    //加载显示更多
   async onLoad(){
       try {
        const {
        data: {
          data,
        },
      } = await getSearchResults(this.page++, this.count, this.keywords);
      // this.searchResults = results;
      console.log(data.results);
      // 如果返回的数据长度为0，就结束加载
      if(data.results.length===0){
         this.finished = true
      }
      this.searchResults.push(...data.results)
      console.log(this.searchResults);
      } catch (error) {
        this.error = true
      }finally {
        this.loading = false
      }
    }
  },
};
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 12px;
  margin-right: 10px;
}
</style>

<template>
  <div>
    <!-- 下拉刷新 刷新一次加载一次loadNextPage-->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功~"
    >
      <!-- 上拉加载 -->
      <van-list
        @load="loadNextPage"
        offset="1"
        finished-text="没有更多了"
        :finished="finished"
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- 每篇文章 -->
        <Articleitem
          v-for="item in articleList"
          :key="item.art_id"
          :articleInfo="item"
        ></Articleitem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from "@/api";
import Articleitem from "./ArticleItem.vue";
export default {
  data() {
    return {
      loading: false,
      refreshLoading: false, //下拉刷新的状态
      finished: false,
      error: false,
      articleList: [],
      pre_timestamp: "", //上一次时间戳
    };
  },
  components: {
    Articleitem,
  },
  props: {
    //文章id
    id: [String, Number],
    required: true,
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date());
        this.pre_timestamp = data.data.pre_timestamp; //保存上一次时间戳
        this.articleList = data.data.results;
        // console.log(data.data);
      } catch (error) {
        if (error.reponse.status == 400) {
          throw new Error(error.reponse.data.message);
        } else {
          this.$toast.fail("获取文章列表失败，请刷新");
        }
      }
    },
    //获取下一页数据
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp);
        //时间戳为null 这结束
        if (!data.data.pre_timestamp) {
          this.finished = true;
          //  return
        }
        //把拿到的新数据 推到原来文章列表里面
        if (this.refreshLoading) {
          //如果是下拉刷新，那么久让新获取的数据，添加到原来数据的前面，相当于实现，下拉刷新功能
          this.articleList.unshift(...data.data.results);
        } else {
          //如果是上拉加载，就把新获取的数据加载到元数据的末尾
          this.articleList.push(...data.data.results);
        }
        console.log(data);
        //更新时间戳
        this.pre_timestamp = data.data.pre_timestamp;
        // console.log(data.data.pre_timestamp);
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      } catch (error) {
        this.error = true;
      } finally {
        //错误与否都结束加载，让加载效果小时
        this.loading = false;
        this.refreshLoading = false;
      }
    },
  },
  created() {
    this.getArticleList();
  },
};
</script>

<style lang="less" scoped></style>

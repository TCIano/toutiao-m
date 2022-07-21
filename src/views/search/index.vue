<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.go(-1)"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>

    <!-- 历史搜索，建议 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
    <component :is="componentId" :keywords="keywords" @selectSugestion="selectSugestion"></component>
  </div>
</template>

<script>

import SearchHistory from "./components/SearchHistory.vue";
import SearchSuggestion from "./components/SearchSuggestion.vue";
import SearchResult from "./components/SearchResult.vue";
export default {
  data() {
    return {
      keywords: "",
      isShowSearchResult: false, //搜索结果的状态
      suggestion:''//点击获取的搜索建议
    };
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  computed: {
    componentId() {
      if (this.keywords.trim() == "") {
        //如果输入框没有值显示搜索历史
        return "SearchHistory";
      }
      if (this.isShowSearchResult) {
        return "SearchResult";
      }
      return "SearchSuggestion";
    },
  },
  methods: {
    onSearch() {
      console.log("sousuo");
      //点击让搜索结果状态改变
      this.isShowSearchResult = true;
      //存储搜索历史
      this.$store.commit('setSearchHistory',this.keywords)
    },
    //聚焦显示搜索建议
    visibleSearchSuggestion() {
      //聚焦时候让搜索结果隐藏
      this.isShowSearchResult = false;
    },
    //点击建议覆盖搜索关键词
    selectSugestion(suggestion){
      this.keywords = suggestion
      //转到搜索结果
      this.isShowSearchResult = true;
    }
  },
};
</script>

<style lang="less" scoped>
.search {
  [role="button"] {
    color: #fff;
  }
}
</style>

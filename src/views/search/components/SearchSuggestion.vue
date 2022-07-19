<template>
  <div>
    <van-cell 
   
    v-for="item,index in hightLightDate" 
    :key="index"
    >
    <template #title>    
        <span v-html="item"></span>
    </template>
      <template #icon>
        <van-icon name="search" class="search-icon"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api";
export default {
    data() {
        return {
            searchSuggestion:[]
        }
    },
  props: {
    keywords: {
      type: String,
      required: true,
    },
  },
  watch: {
    //如果监听的是methods中的方法，可以简写
    keywords:{
        immediate:true,
        handler(){
            this.getSearchSuggestion()
        }
    },
  },
  methods: {
    //获取搜索建议
    async getSearchSuggestion() {
      const {data:{data:{options}}} = await getSearchSuggestion(this.keywords);
      if(options.length==0){
        this.$toast.fail('没有搜索建议')
      }
    //   console.log(options);
      this.searchSuggestion = options.filter(Boolean)
    },
  },
  computed:{
    //计算属性来实现渲染关键字的样式,覆盖原来的数据
    hightLightDate(){
        //把关键字 转为正则
        const reg = new RegExp(this.keywords,'ig')
        return this.searchSuggestion.map((item) =>{
            //让每一个请求返回的数据中内容 和正则比配的那一项 进行对应的操作
            return item.replace(reg,(match)=>{
                return `<span style="color:red">${match}</span>`
            })
        })
    }

  }

};
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 12px;
  margin-right: 10px;
}
</style>

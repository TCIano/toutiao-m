  <template>
    <div>
      <van-cell title="搜索历史">
        
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template >
            <van-icon name="delete-o" class="search-icon" v-if="deleteIconShow" @click="deleteIconShow = false,crossIconShow=true" />
            <div v-else class="edit">
              <span @click="delteAllHistory"> 全部删除</span>
              <span  @click="deleteIconShow =true,crossIconShow = false"> 完成</span>
            </div>
          </template>
          
        </van-cell>
        <van-cell v-for="history,index in $store.state.searchHistory" :key="index" @click="clickSearchHistory(history)">
          <template #title>
            <span >{{history}}</span>
          </template>
          <template #right-icon>
            <div class="cross" v-if="crossIconShow">
              <van-icon name="cross" class="search-icon" @click="deleteSingleHistory(index)"></van-icon>
            </div>
          </template>
        </van-cell>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        deleteIconShow:true,
        crossIconShow:false
      }
    },
    methods: {
      //删除全部历史
      delteAllHistory(){
        this.$store.commit('removeSearchHistory')
      },
      //删除单个历史
      deleteSingleHistory(index){
        console.log(index);
        this.$store.state.searchHistory.splice(index,1)
      },
      //点击搜索历史覆盖文本框
      clickSearchHistory(historyContent){
        this.$emit('clickSearchHistory',historyContent)
      }
    },
  };
  </script>

  <style scoped lang="less">
  .edit {
    font-size: 30px;
  }
  .cross {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 30px;
    color: #ccc;
    .van-icon {
      top: -8px;
      left: 1px;
      position: relative;
      display: inline-block;
      font: normal normal normal 0.37333rem/1 vant-icon;
      font-size: inherit;
      text-rendering: auto;
    }
  }
  :deep(.van-field__left-icon) {
    .search-icon {
      font-size: 35px;
      line-height: inherit;
      padding-top: 10px;
      margin-right: 10px;
    }
  }
  </style>

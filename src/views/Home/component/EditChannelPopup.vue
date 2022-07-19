<template>
  <!-- 弹出层 -->
  <van-popup
    v-model="show"
    closeable
    position="bottom"
    close-icon-position="top-left"
    :style="{ height: '90%' }"
  >
    <div class="popMain">
      <!-- 我的频道  -->
      <div class="my-channel">
        <!--  我的频道标题 -->
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
      
            >{{ isEdit ? "完成" : "编辑" }}</van-button
          >
        </van-cell>

        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10">
          <van-grid-item
            :text="item.name"
            v-for="(item,index) in myChannels"
            :key="item.id"
            :class="{'active-channel':item.name ==='推荐'}"
            @click="onClickChannel(item,index)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="5">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addChannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from "@/api";
export default {
  data() {
    return {
      show: false, //弹出层显示与否
      allChannls: [], //所有频道列表
      isEdit: false, //控制叉号显示
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    //获取所有频道列表
    async getAllChannels() {
      const { data } = await getAllChannels();
      console.log(data);
      this.allChannls = data.data.channels;
    },
    //删除切换频道
    onClickChannel(channel,index){
      //不能删推荐按钮,并且得处于编辑状态
      if(this.isEdit==true && channel.name !== '推荐'){
       return this.$emit('delMychannel', channel.id)
      }
      if(!this.isEdit){
        // 如果不处于编辑，那么点击可以跳转，给父组件传递索引值，和active匹配即可
        this.show = false
        this.$emit('changeActive', index)
      }
    },
    //添加频道
    addChannel(channel){
      // 把频道浅拷贝，防止数据混乱
      this.$emit('addChannel',{...channel} )
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannls.filter((item) => {
        //如果所有频道中包含我的频道中的任意一项，那就筛选出去
        // const result = this.myChannels.find((value) =>{
        //   return  value.id == item.id
        // })
        // //返回除去 我的频道中的 频道
        // return !result
        return !this.myChannels.find((value) => {
          return value.id == item.id;
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.popMain {
  padding-top: 100px;
  .my-channel {
    .van-cell {
      :deep(.van-cell__title) {
        margin-top: 8px;
      }
      //   height: 100px;
      line-height: 50px;
    }
    // 按钮
    .edit-btn {
      // margin-top:-5px;
      color: red;
      padding: 0 30px;
      height: 48px;
      border: 0.02667rem solid red;
    }
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 20px;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
  .active-channel {
          :deep(.van-grid-item__text) {
            color: palevioletred;
          }
        }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;
      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>

<template>
  <div>
    <!-- 无图片 -->
     <van-cell v-if="articleInfo.cover.type === 0" :title="articleInfo.title"  :label="articleDesc" :to="`/detail/${articleInfo.art_id}`" @click="storageArticleId(articleInfo.art_id)"/>

    <!-- 一张 图片 -->
     <van-cell v-if="articleInfo.cover.type === 1" :title="articleInfo.title" :label="articleDesc" :to="`/detail/${articleInfo.art_id}`" @click="storageArticleId(articleInfo.art_id)">
        <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
        />
     </van-cell>


    <!-- 三张 图片 -->
     <van-cell v-if="articleInfo.cover.type === 3"   :title="articleInfo.title" :to="`/detail/${articleInfo.art_id}`" @click="storageArticleId(articleInfo.art_id)">
        <!-- 自定义 内容插槽 -->
        <template #label>
             <van-image
                width="3rem"
                height="2rem"
                v-for="(item,index) in articleInfo.cover.images"
                :key="index"
                :src="item"
                /> 
                <!-- 文章秒数 -->
                <span>{{articleDesc}}</span>
        </template>
     </van-cell>
  </div>
</template>

<script>
//引入格式化事件插件
import dayjs from '@/utils/dayjs'
export default {
    props:{
        articleInfo:{
            type:Object,
             required:true
        }
    },
    computed:{
        articleDesc(){
            const info = this.articleInfo
            //格式化相对时间
            const relativeTime = dayjs(info.pubdate).fromNow()
            return `${info.aut_name}   ${info.comm_count}评论  ${relativeTime}`
        }
    },
    methods: {
        storageArticleId(id){
            //把点击文章的Id存到本地
            this.$store.commit('setArticleId',id)
        }
    },
}
</script>

<style>

</style>

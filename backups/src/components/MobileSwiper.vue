<template>
  <div>
    <div class="swiper-layer" v-show="show">
      <i class="glyphicon glyphicon-remove" @click="show=false"></i>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, i) in swiperImg" :key="i"
                      :style="'background-image:url('+item+');'"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="container text-center">
      <button type="button" class="btn btn-primary" @click="show=true">点击查看图片</button>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'MobileSwiper',
  data () {
    return {
      show: false,
      swiperImg: [
        '../../static/images/001.jpg',
        '../../static/images/012.jpg',
        '../../static/images/003.jpg',
        '../../static/images/011.jpg',
        '../../static/images/005.jpg',
        '../../static/images/013.jpg'],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  mounted () {
  },
  methods: {},
  components: {swiper, swiperSlide}
}
</script>

<style scoped lang="less">
.swiper-layer{
  width:100%;background:rgba(0, 0, 0, .85);position:fixed;z-index:1000;left:0;top:0;right:0;bottom:0;
  & .glyphicon{
    position:absolute;right:10px;top:10px;z-index:1001;color:#fff;cursor:pointer;
  }
  & .swiper-container{
    height:100%;
    & .swiper-slide{
      -webkit-background-size:100%;background-size:100%;background-repeat:no-repeat;background-position:center center;
    }
  }
}
</style>

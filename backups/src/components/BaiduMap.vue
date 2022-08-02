<template>
  <div>
    <BaiduMap
        class="bm-view"
        ak="UFmFfyetiEogVELCmPK6TLcu1NGrnWNd"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="handler"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="size"></bm-navigation>
      <bm-info-window :position="center" :title="infoWindow.title" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
        <p>{{infoWindow.content}}</p>
      </bm-info-window>
      <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" @click="bmMarker">
      </bm-marker>
    </BaiduMap>
  </div>
</template>

<script>
import { BaiduMap, BmNavigation, BmInfoWindow, BmMarker, BmLabel } from 'vue-baidu-map'

export default {
  name: 'BaiduMap',
  data () {
    return {
      center: {lng: 0, lat: 0},
      infoWindow: {
        show: true,
        title: '<font style=\'color:#f00;\'>厦门创新创业园</font>',
        content: '地址：福建省厦门市湖里区火炬东路11号'
      },
      zoom: 15,
      size: {
        width: 10,
        height: 20
      }
    }
  },
  mounted () {},
  methods: {
    syncCenterAndZoom (e) {
      // const {lng, lat} = e.target.getCenter()
      // this.center.lng = lng
      // this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    infoWindowOpen () {
      this.infoWindow.show = true
    },
    infoWindowClose () {
      this.infoWindow.show = false
    },
    handler ({BMap, map}) {
      // console.log(BMap, map)
      this.center.lng = 118.13767
      this.center.lat = 24.523627
      this.zoom = 20
    },
    bmMarker (e) {
      this.infoWindow.show = true
    },
  },
  components: {
    BaiduMap,
    'bm-navigation': BmNavigation,
    'bm-info-window': BmInfoWindow,
    'bm-marker': BmMarker,
    'bm-label': BmLabel
  }
}
</script>

<style scoped lang="less">
.bm-view {
  width: 100%;
  height: 500px;
}
</style>

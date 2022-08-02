<template>
  <div>
    <div id="viewer"></div>
  </div>
</template>

<script>
// Photo Sphere 查看器 插件版本号是4.3.0 更高版本报错
import { Viewer } from 'photo-sphere-viewer'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import 'photo-sphere-viewer/dist/plugins/markers.css'
// https://blog.csdn.net/weixin_42752574/article/details/122243459#animateoptions_Animation_384
// 对于立方体贴图，它必须是数组或对象（对应六个面）
/* const panorama = {
  left: 'path/to/left.jpg',
  front: 'path/to/front.jpg',
  right: 'path/to/right.jpg',
  back: 'path/to/back.jpg',
  top: 'path/to/top.jpg',
  bottom: 'path/to/bottom.jpg'
} */
// 添加标记
// markersPlugin.addMarker({
//   id: 'new-marker',
//   longitude: '40deg',
//   latitude: '0deg',
//   image: require('@/assets/images/position-red.png'),
//   width: 20,
//   height: 20,
//   tooltip: '222222222'
// })

export default {
  name: 'PhotoSphere',
  data () {
    return {
      viewer: '',
      images: [
        require('../../../assets/images/a0uj1-jonzo.jpg'),
        require('../../../assets/images/ageg4-hn6no.jpg'),
        require('../../../assets/images/as8xd-elfw6.jpg')
      ],
      toggleImg: '',
      count: 2
    }
  },
  mounted () {
    this.toggleImg = this.images[1]
    const PSV = new Viewer({
      container: document.querySelector('#viewer'),
      panorama: this.images[0],
      loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
      loadingTxt: '正在加载图片...',
      caption: 'VR看房演示',
      size: {
        width: '100%',
        height: '500px'
      },
      defaultZoomLvl: 10,
      plugins: [
        [MarkersPlugin, {
          markers: [
            {
              id: 'circle',
              tooltip: '查看房间',
              circle: 10,
              svgStyle: {
                fill: 'rgba(255,255,0,0.5)',
                stroke: 'yellow',
                strokeWidth: '1px'
              },
              longitude: 0,
              latitude: 0,
              anchor: 'center center'
            }
          ]
        }]
      ]
    })

    const markersPlugin = PSV.getPlugin(MarkersPlugin)

    markersPlugin.on('select-marker', async (e, marker) => {
      console.log(marker.id)
      await PSV.animate({
        longitude: '0deg',
        latitude: '0deg',
        zoom: 100,
        speed: '-3rpm'
      })
      await PSV.setPanorama(this.toggleImg)

      markersPlugin.updateMarker({
        id: marker.id,
        longitude: '0deg',
        latitude: '0deg'
      })
      PSV.animate({
        zoom: 10,
        speed: '3rpm'
      }).then(() => {
        if (this.images.length > this.count) {
          this.toggleImg = this.images[this.count]
          this.count++
        } else {
          this.toggleImg = this.images[0]
          this.count = 1
        }
        console.log('继续操作', this.toggleImg)
      })
    })
  }
}
</script>

<style scoped>

</style>

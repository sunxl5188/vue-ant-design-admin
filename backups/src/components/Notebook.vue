<template>
    <div class="notebook">
        原标题：巴拉圭2012年来首次联大未提台湾 台当局回应
        继基里巴斯与台湾断绝“邦交”后，与台仍保持联系的仅15个“邦交国”。近日，其“友邦”南美洲国家巴拉圭在27日的联合国大会一般性辩论上，只字未提台湾，这让台当局吓得不轻。
        综合台湾《联合报》、“中央社”9月28日消息，在27日的联大一般性辩论会上，有台湾三个“友邦”（圣卢西亚、圣基茨和尼维斯、圣文森特和格林纳丁斯）接连为台湾发声，要求联合国“接纳台湾”。但巴拉圭外长帕拉西奥斯Antonio
        Rivas Palacios）发言却通篇未提台湾一个字，报道称，这是该国自2012年以来，首次没有在联大上为台湾发言。
        结合这短短一周内，所罗门群岛、基里巴斯竟接连与台湾断绝“邦交”关系后，巴拉圭外长的发言格外引发关注。
        对此，台当局“外交部”28日紧急跳出来回应称，台湾与巴拉圭“邦谊笃睦友好”，台“外交部”发言人欧江安特意指出，巴拉圭今年稍早曾致函过联合国秘书长古特雷斯，声援台湾。
        据了解，巴拉圭是南美洲内陆国家，国土面积40.68万平方公里，人口705.3万人。中巴无外交关系，但1957年巴拉圭同台湾当局建立所谓的“外交关系”，至今已有60多年。
    </div>
</template>

<script>
import '@@/js/jquery-notebook/jquery.notebook'

export default {
  name: 'Notebook',
  data () {
    return {}
  },
  mounted () {
    setTimeout(function () {
      $('.notebook').notebook({
        autoFocus: false,
        placeholder: 'Your text here...',
        mode: 'multiline', // multiline or inline
        modifiers: ['bold', 'italic', 'underline', 'h1', 'h2', 'ol', 'ul', 'anchor', 'msg']
      })
      $('.notebook').on('contentChange', function (e) {
        /* let content = e.originalEvent.detail.content
        console.log(content) */
      })
    }, 1000)
  },
  methods: {},
  components: {}
}
</script>

<style lang="css">
@import "../../static/js/jquery-notebook/jquery.notebook.css";
@import "../../node_modules/font-awesome/css/font-awesome.min.css";
</style>

<template>
  <div>
    <ul>
      <li>{{item.title}}</li>
      <template v-if="item.child">
        <CityList v-for="(item, k) in item.child" :item="item" :key="k"></CityList>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CityList',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {},
  components: {},
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>

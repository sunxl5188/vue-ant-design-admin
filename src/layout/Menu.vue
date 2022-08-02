<template>
  <a-menu
    theme="dark"
    mode="inline"
    :openKeys.sync="vuex_menu.openKeys"
    v-model="vuex_menu.selectedKeys"
    @click="onMenu">
    <a-sub-menu :key="'sub-'+index" v-for="(item, index) in vuex_menu.list">
          <span slot="title">
            <a-icon :type="item.icon"/>
            <span>{{item.title}}</span>
          </span>
      <a-menu-item :key="`sub-${index}-${cIndex}`" v-for="(cItem, cIndex) of item.children">
        <router-link :to="`/${item.path}/${cItem.path}`">{{cItem.title}}</router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      openKeys: '',
      selectedKeys: ''
    }
  },
  mounted () {},
  methods: {
    onMenu ({ item, key, keyPath }) {
      this.$vuex('vuex_menu.openKeys', [keyPath[keyPath.length - 1]])
      this.$vuex('vuex_menu.selectedKeys', [key])
    }
  },
  components: {},
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>

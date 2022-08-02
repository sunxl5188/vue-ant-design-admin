<template>
  <div class="loading-spinner text-center p-3" v-if="loading">
    <img src="@/assets/images/loading.gif" alt="数据加载中...">
    <p class="text-gray-light">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '数据加载中...'
    }
  }
}
</script>

<style scoped>

</style>

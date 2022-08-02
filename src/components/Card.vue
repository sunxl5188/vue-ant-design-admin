<template>
    <div class="w-100 bg-white myCard">
      <a-card :bordered="bordered">
        <template v-if="title">
          <div slot="title">
            <strong class="font-15 text-secondary">{{title}}</strong>
          </div>
          <div slot="extra">
            <slot name="extra"></slot>
          </div>
        </template>
        <div slot="default">
          <slot name="default"></slot>
        </div>
      </a-card>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    bordered: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>

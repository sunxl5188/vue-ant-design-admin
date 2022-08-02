<template>
  <div>
    <!--https://vivify-ideas.github.io/vue-draggable/example/#start-->
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-drag-and-drop:options="options">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <ul>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Draggable',
  data () {
    return {
      options: {
        dropzoneSelector: 'ul',
        draggableSelector: 'li',
        handlerSelector: null,
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDrop: function (event) {
          console.log(event, '1')
        },
        onDragstart: function (event) {
          console.log(event, '2')
        },
        onDragend: function (event) {
          console.log(event, '3')
        }
      }
    }
  },
  computed: {},
  mounted () {
    let self = this
    console.log(self.VueDraggable)
  }
}
</script>

<style scoped>

</style>

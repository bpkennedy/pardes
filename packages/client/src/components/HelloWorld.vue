<template>
  <div class="hello-world">Hello {{msg}}</div>
</template>

<script lang="ts">
export default {
  props: {
    msg: {
      type: String,
      default: 'World!',
    }
  }
}
</script>

<style scoped>

</style>

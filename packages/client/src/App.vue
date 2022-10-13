<template>
  <HelloWorld/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
});
</script>

<style>
body {
  position: relative;
  padding: 0;
  margin: 0;
}
</style>

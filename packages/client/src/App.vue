<template>
  <v-app
    id="inspire"
  >
    <nav-drawer/>

    <v-main
      class="grey lighten-3"
    >
      <router-view/>
    </v-main>

    <bottom-nav/>
  </v-app>
</template>

<script lang="ts">
  import { useBooksStore, LOAD_BIBLE_BOOKS_ACTION } from './stores/books'
  import BottomNav from './components/BottomNav.vue'
  import NavDrawer from './components/NavDrawer.vue'

  export default {
    components: {
      BottomNav,
      NavDrawer,
    },
    setup() {
      const booksStore = useBooksStore()
      return { booksStore }
    },
    beforeCreate() {
      this.booksStore[LOAD_BIBLE_BOOKS_ACTION]()
    }
  }
</script>

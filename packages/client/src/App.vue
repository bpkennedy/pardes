<template>
  <v-app
    id="inspire"
  >
    <top-bar/>
    <v-main
      class="grey lighten-3"
    >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { useBooksStore, LOAD_BIBLE_BOOKS_ACTION } from './stores/books'
  import TopBar from './components/TopBar.vue'

  export default {
    components: {
      TopBar,
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

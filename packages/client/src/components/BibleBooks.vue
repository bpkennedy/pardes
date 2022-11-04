<template>
  <v-card
    class="rounded-0"
  >
    <v-list
      density="compact"
    >
      <v-list-subheader>
        Books
      </v-list-subheader>
      <v-list-item
        v-for="(book, index) in booksStore.bibleBooks"
        :key="book + '-' + index"
        :id="book + '-' + index"
        :value="book"
        @click="openBook(book)"
      >
        <v-list-item-title
          v-text="book"
        />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { LOAD_BIBLE_SINGLE_BOOK_ACTION, useBooksStore } from '../stores/books'

export default {
  setup() {
    const booksStore = useBooksStore()
    return { booksStore }
  },
  methods: {
    openBook(bookName) {
      this.$router.push({ name: 'Book', params: { name: bookName } })
    }
  },
  created() {
    this.$watch(() => this.$route.params, (toParams, previousParams) => {
      if (toParams.name && toParams.name !== previousParams?.name) {
        this.booksStore[LOAD_BIBLE_SINGLE_BOOK_ACTION](toParams.name)
      }
    })
  }
}
</script>

<style scoped>

</style>

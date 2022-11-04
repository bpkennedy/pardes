<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="2"
        class="left-column"
      >
        <v-sheet
          rounded="lg"
          min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        sm="8"
        class="middle-column"
      >
        <v-sheet
          min-height="70vh"
          rounded="lg"
        >
          {{ booksStore.loadedBook }}
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        sm="2"
        class="right-column"
      >
        <v-sheet
          rounded="lg"
          min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { useBooksStore, LOAD_BIBLE_SINGLE_BOOK_ACTION } from '../stores/books'

  export default {
    setup() {
      const booksStore = useBooksStore()

      booksStore.$subscribe((mutation, state) => {
        if (mutation.storeId === 'loadedBook') {
            booksStore[LOAD_BIBLE_SINGLE_BOOK_ACTION]()
        }
      })

      return { booksStore }
    },
    beforeCreate() {
      this.booksStore[LOAD_BIBLE_SINGLE_BOOK_ACTION]()
    }
  }
</script>

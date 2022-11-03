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
          <bible-books
            :books="bibleBooks"
          />
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
          <hellow-world/>
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

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { mapState } from 'pinia'
  import { useBooksStore } from '../stores/books'
  import HellowWorld from '../components/HelloWorld.vue'
  import BibleBooks from '../components/BibleBooks.vue'

  export default {
    components: {
      HellowWorld,
      BibleBooks,
    },
    computed: {
      ...mapState(useBooksStore, ['bibleBooks']),
    },
  }
</script>

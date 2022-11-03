import axios from 'axios'
import { defineStore } from 'pinia'

export const LOAD_BIBLE_BOOKS_ACTION = 'LOAD_BIBLE_BOOKS_ACTION'

export const useBooksStore = defineStore('books', {
  state: () => ({
    bibleBooks: [],
  }),
  actions: {
    async [LOAD_BIBLE_BOOKS_ACTION]() {
      if (this.bibleBooks.length === 0) {
        this.bibleBooks = (await axios.get('/books')).data
      }
    },
  },
})

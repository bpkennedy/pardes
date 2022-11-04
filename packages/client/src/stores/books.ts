import axios from 'axios'
import { defineStore } from 'pinia'
import Router from '../router'

export const LOAD_BIBLE_BOOKS_ACTION = 'LOAD_BIBLE_BOOKS_ACTION'
export const LOAD_BIBLE_SINGLE_BOOK_ACTION = 'LOAD_BIBLE_SINGLE_BOOK_ACTION'

export const useBooksStore = defineStore('books', {
  state: () => ({
    bibleBooks: [],
    loadedBook: [],
  }),
  actions: {
    async [LOAD_BIBLE_BOOKS_ACTION]() {
      if (this.bibleBooks.length === 0) {
        this.bibleBooks = (await axios.get('/books')).data
      }
    },
    async [LOAD_BIBLE_SINGLE_BOOK_ACTION]() {
      this.loadedBook = (await axios.get(`/${Router.currentRoute.value.params.name}`)).data
      console.log(this.loadedBook)
    }
  },
})

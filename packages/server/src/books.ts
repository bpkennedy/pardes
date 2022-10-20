import rawBible from './net.json'
import { Constants } from '@pardes/common'

type bible = typeof rawBible
const bible: bible = {...rawBible}

function sortObjectKeysByBookOrder(unorderedBookObject: bible) {
  const unorderedBooks = Object.keys(unorderedBookObject)
  return unorderedBooks.slice().sort((a, b) => Constants.BIBLE_SORT_ORDER.indexOf(a) - Constants.BIBLE_SORT_ORDER.indexOf(b))
}

function getBibleBooks() {
  return sortObjectKeysByBookOrder(bible)
}

function getBookChapters(book: string) {
  return bible[book]
}

function getChapterVerses(book: string, chapter: string) {
  return bible[book]?.[chapter]
}

function getVerse(book: string, chapter: string, verse: string) {
  return bible[book]?.[chapter]?.[verse]
}

export function createBibleRoutes(app: any) {
  Object.keys(bible).forEach(function(book) {
    app.get(`/${book}`, (req: any, res: any) => {
      res.send(getBookChapters(book))
    })

    Object.keys(bible[book]).forEach(function(chapter) {
      app.get(`/${book}/${chapter}`, (req: any, res: any) => {
        res.send(getChapterVerses(book, chapter))
      })

      Object.keys(bible[book][chapter]).forEach(function(verse) {
        app.get(`/${book}/${chapter}/${verse}`, (req: any, res: any) => {
          res.send(getVerse(book, chapter, verse))
        })
      })
    })
  })

  app.get('/books', (req: any, res: any) => {
    res.send(getBibleBooks())
  })
}

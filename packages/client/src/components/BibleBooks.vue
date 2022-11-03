<template>
  <v-list
    density="compact"
    class="bible-books"
  >
    <v-list-subheader>
      Books
    </v-list-subheader>
    <v-hover>
      <v-list-item
        v-for="(book, index) in books"
        :key="book + '-' + index"
        :id="book + '-' + index"
        active-color="primary"
        variant="plain"
      >
        <v-list-item-title
          v-text="book"
        />
      </v-list-item>
    </v-hover>
  </v-list>
</template>

<script lang="ts">
export default {
  props: {
    books: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style scoped>

</style>

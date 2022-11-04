<template>
  <v-navigation-drawer
    app
    color="grey-darken-2"
    permanent
  >
    <div class="logo-and-title">
      <v-list
        class="pa-0"
      >
        <v-list-item
          value="Home"
          @click="goHome"
        >
          <div
            class="logo-container"
          >
            <v-spacer/>
            <v-list-item-title
              v-text="'Pardes'"
            />
            <v-img
              max-height="40"
              max-width="40"
              src="/pardesLogo.svg"
            ></v-img>
          </div>
        </v-list-item>
      </v-list>
      <bible-books/>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import BibleBooks from '../components/BibleBooks.vue'

  export default {
    components: {
      BibleBooks,
    },
    methods: {
      goHome() {
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>

<style lang="scss">
.logo-container {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
}
</style>
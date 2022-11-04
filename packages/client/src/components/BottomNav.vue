<template>
  <v-bottom-navigation
    app
  >
    <v-btn
      v-for="link in links"
      :key="link.key"
      :to="link.to"
      :value="link.name"
    >
      <v-icon :icon="link.icon"></v-icon>
      {{ link.name }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
  export default {
    data: () => ({
      links: [
        {
          name: 'Bible',
          key: 1,
          to: '/',
          icon: 'mdi-script'
        }, {
          name: 'About',
          key: 2,
          to: '/about',
          icon: 'mdi-heart',
        }
      ],
    }),
  }
</script>

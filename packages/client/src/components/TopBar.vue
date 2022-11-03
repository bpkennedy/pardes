<template>
  <v-app-bar
    app
    color="white"
    density="compact"
    flat
  >
    <v-avatar
      color="grey darken-2 shrink"
      size="32"
    ></v-avatar>

    <v-tabs
      centered
      class="ml-n9 flex-grow-1"
      color="grey darken-1"
    >
      <v-tab
        v-for="link in links"
        :key="link.key"
        :to="link.to"
      >
        {{ link.name }}
      </v-tab>
    </v-tabs>

    <v-avatar
      class="hidden-sm-and-down"
      color="grey darken-1 shrink"
      size="32"
    ></v-avatar>
  </v-app-bar>
</template>

<script lang="ts">
  export default {
    data: () => ({
      links: [
        {
          name: 'Bible',
          key: 1,
          to: '/'
        }, {
          name: 'About',
          key: 2,
          to: '/about'
        }
      ],
    }),
  }
</script>

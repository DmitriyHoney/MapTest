<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { loadYmap  } from 'vue-yandex-maps'
export default {
  data: () => ({
    settings:  {
        apiKey: "38daab83-3d55-4b80-a2af-1a460568ef63",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1"
    },
  }),
  async mounted() {
     await loadYmap(this.settings);
  },
}
</script>

<style lang="scss">

</style>

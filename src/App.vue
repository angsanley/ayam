<template>
  <div id="app">

    <div id="main" v-if="isAuthenticated">
      <the-nav/>
      <div class="content">
        <router-view/>
      </div>
    </div>

    <div v-if="!isAuthenticated">
      <router-view/>
    </div>

    <vue-progress-bar/>
  </div>
</template>

<style>
  .content {
    padding-left: 0;
    padding-bottom: 4rem;
  }
  @media (min-width: 1024px) {
    .content {
      padding-left: 6rem;
      padding-bottom: 0;
    }
  }
</style>
<script>
  import TheNav from "./components/TheNav";
  export default {
    components: {TheNav},
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
    },
  }
</script>

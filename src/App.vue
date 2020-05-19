<template>
  <div id="app">
    <div id="main">
      <the-nav/>
      <router-view/>
    </div>
    <vue-progress-bar/>
  </div>
</template>

<style>
  #main {
    display: grid;
    grid-template-columns: 6rem auto;
  }

  @media (min-width: 1024px) {
    #main { grid-template-columns: 20rem auto; }
  }
</style>
<script>
  import TheNav from "./components/TheNav";
  export default {
    components: {TheNav}
  }
</script>

<template>
  <div id="app">
    <Header/>
    
    <router-view />
    <Footer/>
  </div>
  
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091F43;
  background: #ced2da;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #091F43;

    &.router-link-exact-active {
      color: #D1515A;
    }
  }
}
</style>

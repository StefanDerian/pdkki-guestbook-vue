<template>
  <div id="app">
   <app-header></app-header>
    <router-view/>
  </div>
</template>


<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import {db} from './mixin/firebase'
 
export default {
  name: 'app',
  components:{
    'app-header': Header,
    'app-footer': Footer
  },
  data () {
    return {
      msg: [],
      
    }
  },
  firebase: {
    guests: db.ref('Guests')
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>


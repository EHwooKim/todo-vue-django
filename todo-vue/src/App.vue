<template>
  <div id="app">
    <div id="nav">
      <!-- router-link : vue-router 
        to : router/index.js에 있는 routes 중에 path 값
         -> routes에 정의된 해당 컴포넌트를 불러온다.
      -->

      <router-link to="/">Home</router-link> |
      <div v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link> | 
      </div>
      <div v-else>
        <a @click.prevent="logout" href="#">Logout</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import router from './router'
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: this.$session.has('jwt')  // 로그인 여부 저장하는 곳
    }
  },
  methods: {
    logout() {
      this.$session.destroy() // session에서 해당 내용 다 날려버리겠다!
      router.push('/login')
    }
  },
  updated() {  
    this.isAuthenticated = this.$session.has('jwt')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

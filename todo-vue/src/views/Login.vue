<template>
  <div class="login">
    <h2>로그인</h2>
    <LoginForm @login-event="login"/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import axios from 'axios'
// 특정 폴더명으로 경로가 끝나게 되면, 폴더 내부의 index.js를 뜻함. 그래서 굳이 index.js까지 다 쓰지않고 이렇게 쓴다.
import router from '../router'

export default {
  name: 'login',
  components: {
      LoginForm
  },
  methods: {
      login(credentials) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', credentials)          
          .then(response => {
              console.log(response)
              const token = response.data.token
              this.$session.start()
              this.$session.set('jwt', token)
              // vuex actions 호출할 떄는 -> dispatch를 통해서
              this.$store.dispatch('login', token)
              router.push('/')  // redirect랑 비슷한 기능.
          })
          .catch(error => {
              console.log(error)
          })
      }
  }

}
</script>

<style>

</style>
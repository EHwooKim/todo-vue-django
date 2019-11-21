<template>
  <div class="home">
    <!-- 이벤트 리스너 등록 -->
    <TodoForm @todoCreate-event="todoCreate"/> <!-- pascalcase, uppercamelcase -->
                <!-- kebab-case로 작성도 가능 -->
    <TodoList :todos="todos"/>
  </div>
</template>

<script>
// @ is an alias to /src  <- /src를 @로 쓸수있게 해두었다. 라는 의미
<<<<<<< HEAD
import axios from 'axios' // import requests처럼 requests 다 가져와서 그 안에서 get, post 등등을 쓰는거
// import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex' // from bs4 import BeautifulSoup 같이 vuex의 많은 것들 중에 ampGetters만 가져온다
=======
import axios from 'axios'
import jwtDecode from 'jwt-decode'
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
import router from '../router'
import TodoList from '@/components/TodoList.vue'
import TodoForm from '@/components/TodoForm.vue'


export default {
  name: 'home',
  components: {
    TodoList, 
    TodoForm
  },
  // 컴포넌트에서 data를 함수로 작성하고 object를 리턴한다.
  data() {
    return {
      todos: [],
    }
  },
<<<<<<< HEAD
  computed: {
    // ... : 
    ...mapGetters([
      'options',
      'user'
    ])
    // 이제 토큰값이 session에 있는게 아니라 vuex에 있고 그것을 불러오는데 함수로 정의 했지만 변수이다..(?)
    // options() {
    //   return this.$store.getters.options
    // },
    // user() {
    //   return this.$store.getters.user  // 그런데 이렇게 똑같은 return문을 여러개 쓰면 싫겠지? 그래서 쓰는게 mapGetters
    // }
  },
=======
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
  methods: {
    todoCreate(title) {
      console.log('==부모컴포넌트==')
      console.log(title)
      // 여기에도 이 로그인 정보를 보내야 글이 작성되겠지 jwt떄문에 모든 views 함수에 login_required가 붙어있는 상태니까 
<<<<<<< HEAD
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const options = {
      //   headers: {
      //     Authorization: `JWT ${token}` // 핵심! JWT 다음에 공백이 필요하다!
      //   }
      // }      
      //axios 요청 post/
      // console.log(jwtDecode(token))
      // {user_id: 1, username: "admin", exp: 1574138480, email: ""}
      const data = {
        title: title,
        // user: jwtDecode(token).user_id
        user: this.user
=======
      this.$session.start()
      const token = this.$session.get('jwt')
      const options = {
        headers: {
          Authorization: `JWT ${token}` // 핵심! JWT 다음에 공백이 필요하다!
        }
      }      
      //axios 요청 post/
      console.log(jwtDecode(token))
      // {user_id: 1, username: "admin", exp: 1574138480, email: ""}
      const data = {
        title: title,
        user: jwtDecode(token).user_id
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
      }
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('user', 1)
<<<<<<< HEAD
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data, this.options)
=======
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data, options)
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
        .then(response => {
          console.log(response) // 여기까지만 해놓으면 db에 추가하고 새로고침해야 목록이 뜨잖아!?
                                // 왜냐하면 mount가 안되거든..
          this.todos.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTodos() {
      // axios 요청시마다 헤더를 추가해서 보내야 함. 토큰만 보내면 되는게 아님.
      // session 활성화
<<<<<<< HEAD
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const options = {
      //   headers: {
      //     Authorization: `JWT ${token}` // 핵심! JWT 다음에 공백이 필요하다!
      //   }
      // }
      // axios 요청
      axios.get(`http://127.0.0.1:8000/api/v1/users/${this.user}/`, this.options) // this.user 전에는 jwtDecode(token).user_id 이거 였지
=======
      this.$session.start()
      const token = this.$session.get('jwt')
      const options = {
        headers: {
          Authorization: `JWT ${token}` // 핵심! JWT 다음에 공백이 필요하다!
        }
      }
      // axios 요청
      axios.get(`http://127.0.0.1:8000/api/v1/users/${jwtDecode(token).user_id}/`, options)
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
        .then(response => {
          console.log(response.data)  // 만약 오류가 발생하게되면 ES Lint 때문. 설정을 package.json에 추가
          this.todos = response.data.todo_set
        })
        .catch(error => {
          console.log(error)
        })
    },
    isLogin() {
      this.$session.start()
      // session에 jwt가 없다면, 즉 토큰이 없다면, 비로그인 이라면.
      if (!this.$session.has('jwt')) {
        router.push('/login')
<<<<<<< HEAD
      } else {
        // 로그인되어있다면 vuex token 업데이트
        this.$store.dispatch('login', this.$session.get('jwt'))
=======
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
      }
    }
  },
  mounted() {
    this.isLogin()  // 로그인 되어있으면
    this.getTodos()  // 가져온다. // mounted 가 너무 길어서 메소드로 올리고 메소드 호출로 변경
  }
}
</script>

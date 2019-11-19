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
import axios from 'axios'
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
  methods: {
    todoCreate(title) {
      console.log('==부모컴포넌트==')
      console.log(title)
      //axios 요청 post/
      const data = {
        title: title,
        user: 1
      }
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('user', 1)
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data)
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
      axios.get('http://127.0.0.1:8000/api/v1/todos/')
        .then(response => {
          console.log(response.data)  // 만약 오류가 발생하게되면 ES Lint 때문. 설정을 package.json에 추가
          this.todos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getTodos()  // mounted 가 너무 길어서 메소드로 올리고 메소드 호출로 변경
  }
}
</script>

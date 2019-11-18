<template>
  <div class="home">
    <TodoList :todos="todos"/>
  </div>
</template>

<script>
// @ is an alias to /src  <- /src를 @로 쓸수있게 해두었다. 라는 의미
import axios from 'axios'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'home',
  components: {
    TodoList
  },
  // 컴포넌트에서 data를 함수로 작성하고 object를 리턴한다.
  data() {
    return {
      todos: [],
    }
  },
  mounted() {
    // axios 요청
    axios.get('http://127.0.0.1:8000/api/v1/todos/')
      .then(response => {
        console.log(response.data)  // 만약 오류가 발생하게되면 ES Lint 때문. 설정을 package.json에 추가
        this.todos = response.data
      })
      .catch(error => {
        console.log(error)
      })

  }
}
</script>

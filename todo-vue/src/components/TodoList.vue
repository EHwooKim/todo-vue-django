<template>
  <div class="todo-list">
      <h2>투두</h2>
      <ul>
          <li
            v-for="todo in todos" 
            :key="todo.id"
          >
          <!-- 내가 클릭을 통해서 값을 변경해주고 있지만, @click이 아니라 @chnage이다 -->
          <input v-model="todo.is_completed"
                @change="updateTodo(todo)"  
                type="checkbox">
          {{todo.title}}
          <button @click="deleteTodo(todo)">X</button>
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'TodoList',
  props: {
    todos: {
      type: Array,
      required: true
      }
  },
  methods: {
    deleteTodo(todo) {
      this.$session.start()
      const token = this.$session.get('jwt')
      const options = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }            
      axios.delete(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, options)
        .then(response => {
          console.log(response)
          // const target = this.todos.find(el => {
          //   return el == todo
          // })
          console.log(this)
          const idx = this.todos.indexOf(todo) // 위에꺼 살리고 todo 대신 target해도 되는거고~ js영역이라 방법은 많다.
          if (idx > -1) { // 해당 index가 없으면 -1로 나올거니까  
            this.todos.splice(idx, 1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTodo(todo) {
      this.$session.start()
      const token = this.$session.get('jwt')
      const options = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }            
      // const updatedTodo = {
      //   'id': todo.id,
      //   'user_id': todo.user_id,
      //   'title': todo.title,
      //   'is_completed': todo.is_completed
      // } 이렇게 넘기려고 보니까 이 object의 구조가 todo랑 동일하니 그먄 todo로 넘기면 된다.
      axios.put(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, todo, options)  // put 요청에는 반드시 url, data, config 순서대로 넣어야한다.
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
li {
    list-style: none
}
</style>
<template>
  <form class="todo-form" @submit.prevent="todoCreate"> 
      <label for="title"></label>
      <input 
        v-model="title" 
        type="text" id="title">
      <button type="submit" >등록</button>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
      return {
        title: ''
      }
  },
  methods: {
      todoCreate() {
        // form이 제출되는 경우 해당 함수 실행
        // 부모 컴포넌트로 이벤트 발생($emit)을 통해 데이터 전달.
        this.$emit('todoCreate-event', this.title)
        this.title = ''  // 초기화는 또 여기서 해야하네!
      }
  }
}
</script>

<style>

</style>
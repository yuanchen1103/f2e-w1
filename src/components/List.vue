<template>
  <div class="item">
    <img src="../assets/img/circle.svg" alt="" class="circle" v-if="!todo.completed" @click="completeTodo(todo)">
    <img src="../assets/img/check.svg" alt="" class="circle" v-if="todo.completed" @click="cancelTodo(todo)">
    <p style="display: inline-block;">{{ todo.title }}</p>
    <div style="display: inline-block; float: right;">
      <img src="../assets/img/delete.svg" alt="" class="delete" @click="deleteTodo(todo)">
      <img src="../assets/img/star-blank.svg" alt="" class="star" v-if="!todo.important" @click="starTodo(todo)">
      <img src="../assets/img/star-fill.svg" alt="" class="star" v-if="todo.important" @click="unstarTodo(todo)">
    </div>
    <div style="font-size: 10px; color: #E3E3E3; margin-top: 5px;">
      <i class="far fa-comment" style="margin-left: 40px;"></i>
      <span style="margin-left: 5px;">{{ todo.comments.length }}</span>
      <i class="far fa-calendar-check" style="margin-left: 10px;" v-if="todo.date !== ''"></i>
      <span style="margin-left: 5px;" v-if="todo.date !== ''">{{ todo.date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['todo'],
  data() {
    return {};
  },
  methods: {
    completeTodo(todo) {
      this.$emit('complete-todo', todo);
    },
    cancelTodo(todo) {
      this.$emit('cancel-todo', todo);
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    starTodo(todo) {
      this.$emit('star-todo', todo);
    },
    unstarTodo(todo) {
      this.$emit('unstar-todo', todo);
    }
  }
};
</script>

<style lang="scss">
</style>

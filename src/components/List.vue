<template>
  <div class="item" @click="showDetail(todo)">
    <!-- <img src="../assets/img/circle.svg" alt="" class="circle" v-if="!todo.completed" @click.stop="completeTodo(todo)"> -->
    <i class="far fa-check-circle" style="color: #b8b8b8; cursor: pointer;" v-if="!todo.completed" @click.stop="completeTodo(todo)"></i>
    <!-- <img src="../assets/img/check.svg" alt="" class="circle" v-if="todo.completed" @click.stop="cancelTodo(todo)"> -->
    <i class="fas fa-check-circle" style="color: #B8E986; cursor: pointer;" v-if="todo.completed" @click.stop="cancelTodo(todo)"></i>
    <p style="display: inline-block;">{{ todo.title }}</p>
    <div style="display: inline-block; float: right;">
      <!-- <img src="../assets/img/delete.svg" alt="" class="delete" @click.stop="deleteTodo(todo)"> -->
      <i class="far fa-trash-alt" style="margin-right: 5px; margin-top: 5px; color: #b8b8b8; cursor: pointer;" @click.stop="deleteTodo(todo)"></i>
      <!-- <img src="../assets/img/star-blank.svg" alt="" class="star" v-if="!todo.important" @click.stop="starTodo(todo)"> -->
      <i class="far fa-star" style="margin-right: 5px; margin-top: 5px; color: #b8b8b8; cursor: pointer;" @click.stop="starTodo(todo)" v-if="!todo.important"></i>
      <!-- <img src="../assets/img/star-fill.svg" alt="" class="star" v-if="todo.important" @click.stop="unstarTodo(todo)"> -->
      <i class="fas fa-star" style="margin-right: 5px; margin-top: 5px; color: #F5A623; cursor: pointer;" @click.stop="unstarTodo(todo)" v-if="todo.important" ></i>
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
    },
    showDetail(todo) {
      this.$emit('show-detail', todo);
    }
  }
};
</script>

<style lang="scss">
</style>

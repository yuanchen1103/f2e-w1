<template>
  <div id="app">
    <div class="main-card">
      <div style="margin-bottom: 35px;">
         <div style="display: inline-block">
            <div class="date">{{ date }}</div>
            <div class="month-year">
               <div class="month">{{ month }}</div>
               <div class="year">{{ year }}</div>
            </div>
         </div>
         <div class="day">{{ day }}</div>
      </div>
      <div style="margin-bottom: 20px;">
         <input type="text" v-model="text" placeholder="Go to a Movie..." :class="{warn: textBlank}" @keyup.enter="addTodo">
         <button @click="addTodo">
            <img src="./assets/img/plus-icon.svg" alt="" style="height: 15px;">
         </button>
      </div>
      <!-- all -->
      <div v-if="allFilter">
        <List v-for="todo in importantFilterAll" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo" @show-detail="showDetail"/>
        <List v-for="todo in unimportantFilterAll" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo" @show-detail="showDetail"/>
      </div>

      <!-- todo -->
      <div v-if="todoFilter">
        <List v-for="todo in importantFilterTodo" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo" @show-detail="showDetail"/>
        <List v-for="todo in unimportantFilterTodo" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo" @show-detail="showDetail"/>
      </div>

      <!-- completed -->
      <div v-if="completedFilter">
        <List v-for="todo in importantFilterCompleted" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo" @show-detail="showDetail"/>
        <List v-for="todo in unimportantFilterCompleted" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo" @show-detail="showDetail"/>
      </div>

      <div class="line"></div>
      <div class="filter">
         <p @click="sortAll" :class="{ active: allFilter }">All</p>
         <p @click="sortTodo" :class="{ active: todoFilter }">Todo</p>
         <p @click="sortCompleted" :class="{ active: completedFilter }">Completed</p>
      </div>
    </div>

    <modal name="modal" :height="'auto'" :width="300" :scrollable="true" @before-open="beforeOpen" :clickToClose="false">
      <div style="margin-left: 20px; margin-right: 20px; padding-bottom: 20px;">
        <p style="margin-top: 30px; text-align: center; font-size: 18px; margin-bottom: 0;" v-if="!isEdit">{{ modalData.title }}</p>
        <input type="text" placeholder="ex: 2018-06-12" style="width: 260px; margin-top: 30px; margin-bottom: 10px;" v-model="modalData.title" v-if="isEdit">
        <p v-if="!isEdit" @click="editTodo" style="text-align: center; font-size:12px; margin-bottom: 10px; color: #b8b8b8; cursor: pointer"><i class="far fa-edit"></i></p>
        <p style="margin-bottom: 5px; margin-left: 5px;">Date:</p>
        <input type="text" placeholder="ex: 2018-06-12" style="width: 260px;" v-model="modalData.date">
        <p style="margin-bottom: 5px; margin-left: 5px; margin-top: 20px;">Comments:</p>
        <input type="text" placeholder="Add..." style="width: 260px;" @keyup.enter="addComments()" v-model="commentText">
        <div v-for="item in modalData.comments" :key="item.index">
          <div class="comment-item">
            <span>{{item}}</span>
            <img src="./assets/img/delete.svg" alt="" style="height: 14px; float: right; margin-top: 5px; cursor: pointer;" @click.stop="deleteComment(item)">
          </div>
        </div>
        <button style="width: 260px; margin-left: 0; margin-top: 20px; color: #fff;" @click="closeDetail">Close and Save</button>
      </div>


    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import List from './components/List'

export default {
  name: 'app',
  components: {
    List
  },
  data () {
    return {
      isEdit: false,
      text: '',
      textBlank: false,
      allFilter: true,
      todoFilter: false,
      completedFilter: false,
      modalData: {},
      commentText: '',
      todos: [
        {
          title: 'Have a lunch with Kate',
          completed: false,
          important: true,
          comments: [
            '6:00pm',
            'the new restaurant'
          ],
          date: '2018-06-04'
        },
        {
          title: 'Do my homework',
          completed: false,
          important: false,
          comments: [],
          date: '2018-06-02'
        },
        {
          title: 'Prepare tests',
          completed: true,
          important: false,
          comments: [],
          date: '2018-06-01'
        },
      ]
    }
  },
  computed: {
    date() {
      return moment().format('DD');
    },
    month() {
      return moment().format('MMM').toUpperCase();
    },
    year() {
      return moment().format('YYYY');
    },
    day() {
      return moment().format('dddd');
    },
    importantFilterAll() {
      return this.todos.filter(todo => todo.important === true);
    },
    unimportantFilterAll() {
      return this.todos.filter(todo => todo.important === false);
    },
    importantFilterTodo() {
      return this.todos.filter(todo => (todo.important === true && todo.completed === false));
    },
    unimportantFilterTodo() {
      return this.todos.filter(todo => (todo.important === false && todo.completed === false));
    },
    importantFilterCompleted() {
      return this.todos.filter(todo => (todo.important === true && todo.completed === true));
    },
    unimportantFilterCompleted() {
      return this.todos.filter(todo => (todo.important === false && todo.completed === true));
    }
  },
  methods: {
    addTodo() {
      if(this.text === ''){
        this.textBlank = true;
      }
      else {
        this.textBlank = false;
        this.todos.unshift({
          title: this.text,
          completed: false,
          important: false,
          comments: [],
          date: ''
        });
        this.text = ''
      }
    },
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].completed = true;
    },
    cancelTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].completed = false;
    },
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    starTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].important = true;
    },
    unstarTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].important = false;
    },
    sortAll() {
      this.allFilter = true;
      this.todoFilter = false;
      this.completedFilter = false;
    },
    sortTodo() {
      this.allFilter = false;
      this.todoFilter = true;
      this.completedFilter = false;
    },
    editTodo() {
      this.isEdit = true;
    },
    sortCompleted() {
      this.allFilter = false;
      this.todoFilter = false;
      this.completedFilter = true;
    },
    showDetail(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.$modal.show('modal', { todo: todo, todoIndex: todoIndex});
    },
    closeDetail() {
      this.$modal.hide('modal');
      this.isEdit = false;
    },
    beforeOpen(event) {
      this.modalData = event.params.todo;
      this.modalData.index = event.params.todoIndex;
    },
    addComments() {
      if(this.commentText === ''){
        console.log('blank')
      }
      else {
        this.todos[this.modalData.index].comments.unshift(this.commentText);
        this.commentText = '';
      }
    },
    deleteComment(item) {
      const commentIndex = this.todos[this.modalData.index].comments.indexOf(item);
      this.todos[this.modalData.index].comments.splice(commentIndex, 1);
    }
  }
}
</script>

<style lang="scss">

</style>

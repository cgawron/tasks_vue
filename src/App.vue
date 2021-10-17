<template>
  <nav class="navbar navbar-dark bg-dark fixed-top" id="nav">
    <span class="navbar-brand">TASKBOARD</span>
    <router-link to="/">Home</router-link>
    <router-link to="/">NEW TASK</router-link>
  </nav>
  <Lanes :lanes="lanes" v-model:tasks="tasks" class="main" />
</template>

<script>
import Lanes from "./components/Lanes.vue";

export default {
  name: "App",
  data() {
    return {
      tasks: {
        1: {
          id: 1,
          title: "Learn JavaScript",
          description: "read a book on Javascript",
          status: 0,
        },

        2: {
          id: 2,
          title: "Learn Vue",
          description: "read a book on Vue",
          status: 1,
        },
        3: {
          id: 3,
          title: "Build something awesome",
          description: "Get an idea",
          status: 0,
        },
      },
      lanes: [
        {
          id: "lane1",
          icon: "list",
          status: 0,
          title: "To Do",
          description: "All tasks you need to do",
        },
        {
          id: "lane2",
          icon: "hourglass-start",
          status: 1,
          title: "In Progress",
          description: "All tasks currently in progress",
        },
        {
          id: "lane3",
          icon: "check-circle",
          status: 2,
          title: "Done",
          description: "All completed tasks",
        },
      ],
    };
  },
  components: {
    Lanes,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

.main {
  position: relative;
  top: 60px;
  padding: 60px 30px 0;
}
</style>

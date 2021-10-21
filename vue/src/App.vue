<template>
  <nav class="navbar navbar-dark bg-dark fixed-top" id="nav">
    <span class="navbar-brand">TASKBOARD</span>
  </nav>
  <Lanes :lanes="lanes" v-model:tasks="tasks" class="main" />
</template>

<script>
import Lanes from "./components/Lanes.vue";

export default {
  name: "App",
  computed: {
    lanes() {
      return this.$store.state.lanes;
    },
    tasks() {
      return this.$store.state.tasks;
    },
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

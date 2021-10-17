<template>
  <div class="row">
    <div v-for="lane in lanes" :key="lane.id" class="col-md-4 col-xs-12">
      <div class="card">
        <!-- Default panel contents -->
        <div class="card-header">
          <FontAwesomeIcon :icon="lane.icon" />
          {{ lane.title }}
        </div>
        <div class="card-body">
          <p>Tasks newly added in the backlog.</p>
        </div>
      </div>
      <ul class="list-group task">
        <li
          v-for="task in Object.values(tasks).filter(
            (task) => task.status === lane.status
          )"
          :key="task.id"
          class="list-group-item"
        >
          <h4>
            {{ task.title }}
            <button
              type="button"
              class="btn btn-sm btn-primary pull-right"
              @click="edit(task)"
            >
              <span><FontAwesomeIcon icon="pencil-alt" /></span>
            </button>
          </h4>
          <p>{{ task.description }}</p>
        </li>
      </ul>
    </div>
    <div v-if="editTask">
      <EditTask :task="editTask" @update:task="updateTask"></EditTask>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faList,
  faHourglassStart,
  faPencilAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import EditTask from "./EditTask.vue";

let icons = [faList, faCheckCircle, faHourglassStart, faPencilAlt, faUser];
icons.forEach((icon) => library.add(icon));

export default {
  name: "ToDos",
  data() {
    return {
      editTask: null,
    };
  },
  props: {
    lanes: Array,
    tasks: Object,
  },
  methods: {
    nextState(task) {
      task.status++;
      //let tasks = { ...this.tasks };
      this.$emit("update:tasks", this.tasks);
    },
    edit(task) {
      console.log(task);
      this.editTask = task;
    },
    updateTask(task) {
      this.editTask = null;
      let tasks = { ...this.tasks, [task.id]: task };
      console.log(tasks);
      this.$emit("update:tasks", tasks);
    },
  },
  components: {
    FontAwesomeIcon,
    EditTask,
  },
};
</script>

<style>
.pull-right {
  float: right;
  padding: 1px;
}

.task {
  margin-top: 5px;
}
</style>

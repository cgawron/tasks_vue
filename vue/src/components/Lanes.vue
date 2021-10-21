<template>
  <div class="row">
    <div v-for="lane in lanes" :key="lane.id" class="col-md-4 col-xs-12">
      <div class="card">
        <!-- Default panel contents -->
        <div class="card-header" data-test="title">
          <FontAwesomeIcon :icon="lane.icon" />
          {{ lane.title }}
          <button
            v-if="lane.status == 0"
            type="button"
            class="btn btn-sm pull-right"
            @click="addTask()"
          >
            <span><FontAwesomeIcon icon="plus" /></span>
          </button>
        </div>
        <div class="card-body" data-test="description">
          <p>{{ lane.description }}</p>
        </div>
      </div>
      <div class="drop" :data-status="lane.status" @dragover="dragOver" @drop="drop">
        <ul class="list-group task">
          <li
            v-for="task in Object.values(tasks).filter(
              (task) => task.status === lane.status
            )"
            :key="task.id"
            :data-id="task.id"
            class="item"
            draggable="true"
            @dragstart="dragStart"
            @dragend="dragEnd"
          >
            <div class="card">
              <div class="card-header align-left">
                <h4>
                  {{ task.title }}
                  <button type="button" class="btn btn-sm pull-right" @click="edit(task)">
                    <span><FontAwesomeIcon icon="pencil-alt" /></span>
                  </button>
                </h4>
              </div>
              <div class="card-body align-left">
                <p>{{ task.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <EditTask ref="editor"></EditTask>
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
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import EditTask from "./EditTask.vue";

let icons = [faList, faCheckCircle, faHourglassStart, faPencilAlt, faUser, faPlus];
icons.forEach((icon) => library.add(icon));

export default {
  name: "ToDos",
  props: {
    lanes: Array,
    tasks: Object,
  },
  methods: {
    addTask() {
      let task = {
        id: Date.now(),
        title: "New task",
        description: "",
        status: 0,
      };
      this.$store.dispatch("addTask", task).then(() => {
        this.$refs.editor.edit(task);
      });
    },
    edit(task) {
      console.log(task);
      this.$refs.editor.edit(task);
    },
    dragStart(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("text/plain", event.target.dataset.id);
      event.currentTarget.classList.add("drag");
    },
    dragEnd(event) {
      event.currentTarget.classList.remove("drag");
    },
    dragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    drop(event) {
      event.preventDefault();
      let taskId = event.dataTransfer.getData("text/plain");
      let task = this.tasks[taskId];
      if (event.target.dataset.status) {
        let status = parseInt(event.target.dataset.status);
        this.$store.dispatch("updateTask", { ...task, status });
      }
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

.drop {
  position: relative;
  height: 100%;
}

.drag {
  opacity: 0.5;
}

.item {
  display: block;
  margin-bottom: 5px;
}

.align-left {
  text-align: left;
}

.card-header {
  height: 55px;
  vertical-align: middle;
}
</style>

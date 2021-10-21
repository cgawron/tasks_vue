<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
    ref="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Task</h5>
          <button
            type="button"
            class="btn-close"
            @click="cancel"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <label for="title" class="form-label">Title</label>
            <input class="form-control" type="text" id="title" v-model="task.title" />
          </div>
          <div>
            <label for="description" class="form-label">Description</label>
            <textarea
              class="form-control"
              type="text"
              id="description"
              v-model="task.description"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="updateTask">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap/dist/js/bootstrap.esm.min.js";

export default {
  name: "EditTask",
  data() {
    return {
      task: {
        title: "",
        description: "",
      },
      modal: null,
    };
  },
  methods: {
    cancel() {
      this.modal.hide();
    },
    edit(task) {
      this.task = task;
      this.modal.show();
    },
    updateTask() {
      this.modal.hide();
      this.$store.dispatch("updateTask", {
        ...this.task,
      });
    },
  },
  mounted() {
    console.log(this.$refs.dialog);
    this.modal = new Modal(this.$refs.dialog);
  },
};
</script>

<style>
.form-label {
  display: block;
  text-align: left;
  margin-top: 1rem;
  padding-left: 0.5rem;
}

input {
  width: 100%;
}
</style>

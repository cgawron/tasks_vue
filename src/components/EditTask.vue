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
            <input class="form-control" type="text" id="title" v-model="title" />
          </div>
          <div>
            <label for="description" class="form-label">Description</label>
            <textarea
              class="form-control"
              type="text"
              id="description"
              v-model="description"
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
  props: {
    task: Object,
  },
  emits: ["update:task"],
  data() {
    return {
      title: this.task.title,
      description: this.task.description,
      modal: null,
    };
  },
  methods: {
    cancel() {
      this.modal.hide();
      this.$emit("update:task", this.task);
    },
    updateTask() {
      console.log("update");
      this.modal.hide();
      this.$emit("update:task", {
        ...this.task,
        title: this.title,
        description: this.description,
      });
    },
  },
  mounted() {
    console.log(this.$refs.dialog);
    this.modal = new Modal(this.$refs.dialog);
    this.modal.show();
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

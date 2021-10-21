import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { cloneDeep } from 'lodash'


const store = createStore({
    state() {
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
        }
    },
    mutations: {
        deleteTask(state, id) {
            delete state.tasks[id]
        },
        addTask(state, task) {
            state.tasks[task.id] = task
        },
        updateTask(state, task) {
            state.tasks[task.id] = task
        }
    },
    actions: {
        deleteTask(context, task) {
            console.log("deleteTask: %o", task)
            context.commit('deleteTask', task.id)
        },
        addTask(context, task) {
            console.log("addTask: %o", task)
            context.commit('addTask', task)
        },
        updateTask(context, task) {
            console.log("updateTask: %o", task)
            context.commit('updateTask', task)
        }
    }
});

function clone(obj) { return cloneDeep(obj) }

store.subscribe((mutation, state) => {
    console.log("mutation: %o", mutation)
    console.log("state: %s", JSON.stringify(state))
    window.history.pushState(clone(state), "")
})

function handler(event) {
    console.log("onpopstate: this=%o", this)
    if (event.state != null) {
        this.replaceState(clone(event.state))
        console.log("onpopstate: state=%o", event.state)
    }
}

window.onpopstate = handler.bind(store);
window.history.pushState(clone(store.state), "")

createApp(App)
    .use(store)
    .mount('#app')
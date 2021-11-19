import Lanes from './Lanes';
import EditTask from './EditTask';
import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faPlus, faList, faCheckCircle, faHourglassStart, faPencilAlt, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faPlus, faList, faCheckCircle, faHourglassStart, faPencilAlt, faUser)

const data = {
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
      description: "read a book on React",
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
  ]
}

function App(props) {

  const [lanes, setLanes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // ToDo: Get data from backend
  useEffect(() => {
    setLanes(data.lanes);
    setTasks(data.tasks);
  }, [ data ]);

  function moveTask(taskId, status) {
    console.log("move task", taskId, status);
    let newTasks = { ...tasks, [taskId]: { ...tasks[taskId], status: status } }
    console.log("new tasks", newTasks);
    setTasks(newTasks);
  }

  function editTask(task) {
    console.log("edit task", task);
    setEditingTask(task);
  }

  function saveTask(task) {
    console.log("save task", task);
    setEditingTask(null);
    setTasks({ ...tasks, [task.id]: task });
  }

  

  return (
    <div className="App">
      <Nav class="navbar navbar-dark bg-dark fixed-top" id="nav">
        <span class="navbar-brand">TASKBOARD</span>
      </Nav>
      <Lanes lanes={lanes} tasks={tasks} editTask={editTask} moveTask={moveTask} />
      <EditTask task={editingTask} onSave={saveTask} />
    </div>
  );
}

export default App;

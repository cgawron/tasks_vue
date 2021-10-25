import { Button, Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Lanes.css';

function Lanes(props) {

    function addTask(ev) {
        console.log("addTask: %o", ev)
    }

    function edit(task, ev) {
        console.log("edit: %o %o", ev, task)
        props.editTask(task);
    }


    function dragStart(event) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("text/plain", event.target.dataset.id);
        event.currentTarget.classList.add("drag");
    }

    function dragEnd(event) {
        event.currentTarget.classList.remove("drag");
    }

    function dragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function drop(event) {
        event.preventDefault();
        let taskId = event.dataTransfer.getData("text/plain");

        if (event.target.dataset.status) {
            let status = parseInt(event.target.dataset.status);
            console.log("drop: %o %o", taskId, status);
            props.moveTask(taskId, status);
        }
    }

    function getTasks(lane) {
        console.log("getTasks: %o", lane);
        return Object.values(props.tasks)
            .filter(task => task.status === lane.status)
            .map(task => (
                <Card className="task" border="secondary" data-id={task.id} onDragStart={dragStart} onDragEnd={dragEnd} draggable="true">
                    <Card.Header>
                        <Card.Title>{task.title}
                            <Button className="pull-right edit" variant="outline-secondary" onClick={edit.bind(this, task)}><FontAwesomeIcon icon="pencil-alt" size="sm" /></Button>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {task.description}
                    </Card.Body>
                </Card>
            ));
    }


    console.log("Lanes: %o", props.lanes)
    let lanes = props.lanes.map((lane, index) => {
        return (
            <div className="col-md-4 col-xs-12">
                <Card key={lane.id}>
                    <Card.Header>
                        {lane.title} {index === 0 ? (
                            <Button variant="primary"
                                size="sm"
                                className="pull-right"
                                onClick={addTask}>
                                <FontAwesomeIcon icon="plus" /></Button>) : null}
                    </Card.Header>
                    <Card.Body>{lane.description}</Card.Body>
                </Card>
                <div className="drop" data-status={lane.status} onDrop={drop} onDragOver={dragOver}>{getTasks(lane)}</div>
            </div>
        )
    });
    return (
        <div>
            <Row>{lanes}</Row>
        </div>
    );
}

export default Lanes;
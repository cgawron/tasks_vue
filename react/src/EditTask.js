import { Button, Form, Label, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function EditTask(props) {

    const [show, setShow] = useState(props.task);
    const [task, setTask] = useState(props.task);

    function handleClose() {
        console.log('handleClose');
        setShow(false);
    }

    function handleChange(event) {
        console.log('handleChange: %s %s', event.target.name, event.target.value);
        setTask({ ...task, [event.target.name]: event.target.value });
    }

    function save(event) {
        console.log('save: %o', task);
        event.preventDefault();
        props.onSave(task);
        setShow(false);
    }

    let dialog = null;

    useEffect(() => {
        setShow(props.task);
        setTask(props.task);
    }, [props.task]);

    if (task) {
        console.log('props.task: title=%s', task.title);
        dialog = (
            <Modal.Dialog>
                <Modal.Header closeButton="true">
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Task Name" name="title" value={task.title} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Task Description" name="description" value={task.description} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={save}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }

    return (

        <Modal show={show}
            onHide={handleClose}
            backdrop="static">
            {dialog}
        </Modal>)



}

export default EditTask;
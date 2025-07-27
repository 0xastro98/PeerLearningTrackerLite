import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import {Modal, Form, Button} from 'react-bootstrap'
import {ref, set, push} from 'firebase/database'

export default function AddTaskModal(){
  const [goalName, setGoalName] = useState('')
  const [goalDescription, setGoalDescription] = useState('')
  const [goalProgress, setGoalProgress] = useState('')
  return(
    <>
      <Modal>
        <Modal.Header>
          <Modal.Title>Add A Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Goal Name</Form.Label>
              <Form.Control type="text" onChange={(e:any) => setGoalName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Add Goal</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
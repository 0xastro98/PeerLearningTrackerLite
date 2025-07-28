import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import {Modal, Form, Button, Alert} from 'react-bootstrap'
import {ref, set, push} from 'firebase/database'
import {database} from '../../utils/firebaseConfig'

interface AddGoalModalProps {
  show: boolean,
  onHide: () => void
}
export default function AddGoalModal({show, onHide} : AddGoalModalProps){
  const goalsRef = ref(database, 'goals')
  const [goalName, setGoalName] = useState('')
  const [goalDescription, setGoalDescription] = useState('')
  const [goalProgress, setGoalProgress] = useState('')
  const pushGoal = push(goalsRef)
  const [isPosted, setIsPosted] = useState(false)
  
  const addGoalFunc = (e:any) => {
    e.preventDefault()
    set(pushGoal, {
      title: goalName,
      description: goalDescription
    })
    setIsPosted(true)
  }
  return(
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isPosted ? <Alert variant="success">Goal Is Posted</Alert> : null}
          <Form onSubmit={addGoalFunc}>
            <Form.Group className="mb-3">
              <Form.Label>Goal Name</Form.Label>
              <Form.Control type="text" onChange={(e:any) => setGoalName(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Goal Description</Form.Label>
              <Form.Control as="textarea" rows={4} onChange={(e:any) => setGoalDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">Add Goal</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
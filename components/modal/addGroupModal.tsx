import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import {Modal, Form} from 'react-bootstrap'
import {ref} from 'firebase/database'

//utils
import {database} from '../../utils/firebaseConfig'

export default function AddGroupModal(){
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const tasks = ref(database, 'tasks')
  return(
    <>
      <Modal>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  )
}
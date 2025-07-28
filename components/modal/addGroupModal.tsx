import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import {Modal, Form} from 'react-bootstrap'
import {push, ref, set} from 'firebase/database'
import {useAuth} from '../../contexts/AuthContext'
import {Button} from 'react-bootstrap'

//utils
import {database} from '../../utils/firebaseConfig'

interface joinGroupProps {
  show: boolean,
  onHide: () => void,
  groupKey: string,
  groupName: string
}
export default function JoinGroupModal({show, onHide, groupKey, groupName} : joinGroupProps){
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const membersRef = ref(database, `group/${groupKey}/members`)
  const pushMember = push(membersRef)
  const {
    displayName,
    userEmail
  } = useAuth()
  const addMemberFunc = (e:any) => {
    e.preventDefault()
    set(pushMember, {
      name: displayName,
      email: userEmail
    })
  }
  return(
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Join {groupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          By clicking on the button below, you are agreeing to join {groupName} group.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addMemberFunc}>
            Join {groupName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
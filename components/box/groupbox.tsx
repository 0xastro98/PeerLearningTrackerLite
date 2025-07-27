import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/Home.module.css'
import {ref, onValue} from 'firebase/database'
import {Button} from 'react-bootstrap'

//utils
import {database} from '../../utils/firebaseConfig'

export default function GroupBox(props:any){
  const router = useRouter()
  const groupsRef = ref(database, 'goals')
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')

  useEffect(() => {
    onValue(groupsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key
        const val = childSnapshot.val()
        if(key === props.groupKey){
          setGroupName(val.name)
          setGroupDescription(val.description)
        }
      })
    })
  })
  return(
    <>
      <div className={styles.box}>
        <h2><b>{groupName}</b></h2>
        <h4>{groupDescription}</h4>
      </div>
    </>
  )
}
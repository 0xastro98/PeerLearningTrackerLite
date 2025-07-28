import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/Home.module.css'
import {Button} from 'react-bootstrap'
import {ref, onValue} from 'firebase/database'

//contexts
import {useAuth} from '../../contexts/AuthContext'

//utils
import {database} from '../../utils/firebaseConfig'

export default function GoalBox(props:any){
  const router = useRouter()
  const membersRef = ref(database, ``)
  const {
    currentUser,
    userEmail
  } = useAuth()
  const goalsRef = ref(database, 'goals')
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDescription, setGoalDescription] = useState('')
  const [goalProgress, setGoalProgress] = useState('')

  useEffect(() => {
    onValue(goalsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key
        const val = childSnapshot.val()
        if(key === props.goalKey){
          setGoalTitle(val.title)
          setGoalDescription(val.description)
          setGoalProgress(val.goalProgress)
        }
      })
    })
  }, [props.goalKey])
  return(
    <>
      <div className={styles.box}>
        <h2><b>{goalTitle}</b></h2>
        <h4>{goalDescription}</h4>
      </div>
    </>
  )
}
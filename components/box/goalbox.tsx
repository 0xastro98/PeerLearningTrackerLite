import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/Home.module.css'
import {Button} from 'react-bootstrap'
import {ref, onValue} from 'firebase/database'

export default function GoalBox(){
  const router = useRouter()
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDescription, setDescription] = useState('')
  const [goalProgress, setGoalProgress] = useState('')
  return(
    <>
      <div className={styles.box}>
      
      </div>
    </>
  )
}
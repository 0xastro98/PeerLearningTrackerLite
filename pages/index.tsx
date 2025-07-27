import type { NextPage } from "next";
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {useAuth} from '../contexts/AuthContext'
import {ref, onValue} from 'firebase/database'
import {Button, Row, Col} from 'react-bootstrap'

//modals
import AddGoalModal from '../components/modal/addGroupModal'
import AddGroupModal from '../components/modal/addGoalModal'

//box
import GoalBox from '../components/box/goalbox'
import GroupBox from '../components/box/groupbox'

//utils
import {database} from '../utils/firebaseConfig'

const Home: NextPage = () => {
  const router = useRouter()
  const [groups, setGroups] = useState<any | null>([])
  const [goals, setGoals] = useState<any | null>([])
  const goalsRef = ref(database, 'goals')
  const groupsRef = ref(database, 'groups')
  const {
    currentUser,
    redirectTo
  } = useAuth()
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)

  useEffect(() => {
    if(!currentUser){
      redirectTo('/')
      router.push('/signin')
    }
  }, [currentUser])

  useEffect(() => {
    let tempGoals : any[] = []
    let tempGroups : any[] = []
    onValue(goalsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key
        const val = childSnapshot.val()
        tempGoals.push(key)
      })
      setGoals([...tempGoals])
    })
    onValue(groupsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key
        const val = childSnapshot.val()
        tempGroups.push(key)
      })
      setGroups([...tempGroups])
    })
  }, [])

  return (
     <div className={styles.appcontainer}>
       <div className={styles.apppage}>
         <div>
           
         </div>
          <Row>
            <Col>
              <Button>Add Group</Button>
            </Col>
          </Row>
           <div>
           {
             groups.map((i:any) => {
               <GroupBox groupKey={i} />
             })
           }
            </div>
         </div>
     </div>
  );
};

export default Home;

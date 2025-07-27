import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/Home.module.css'
import {Form, Button} from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'

export default function SignIn(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    signin,
    page
  } = useAuth()

  const signInFunc = async(e:any) => {
    e.preventDefault()
    try{
      await signin(email, password)
      if(typeof page !== 'undefined'){
        router.push(`${page}`)
      }
      else{
        router.push('/')
      }
    }catch(error){
      
    }
  }
  return(
    <>
      <center>
        <div className={styles.authpage}>
          <div className={styles.authbox}>
            <center>
              <h2><b>Sign In</b></h2>
            </center>
            <Form onSubmit={signInFunc}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="test@email.com" onChange={(e:any) => setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e:any) => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <div className={styles.blackbtn}>
                  <Button size="lg" variant="custom" type="submit">Sign In</Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </center>
    </>
  )
}
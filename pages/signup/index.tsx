import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import {Form, Button} from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'

export default function SignUp(){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {
    generalsignup
  } = useAuth()

  const signUpFunc = async(e:any) => {
    if(confirmPassword === password){
      try{
        await generalsignup(firstName, lastName, email, password)
        router.push('/verification')
      } catch(error){
        //do something
        if(error instanceof Error){
          console.log(error.message)
        }
      }
    }
    else{
      //error
    }
  }
  return(
    <>
      <div className={styles.authpage}>
        <center>
          <div className={styles.authbox}>
            <h2><b>Sign Up</b></h2>
            <Form onSubmit={signUpFunc}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" onChange={(e:any) => setFirstName(e.target.value)} size="lg" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={(e:any) => setLastName(e.target.value)} size="lg" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e:any) => setEmail(e.target.value)} size="lg" />              
              </Form.Group>
              <Form.Group className="mb-3">
                 <Form.Label>Password</Form.Label> 
                <Form.Control type="password" onChange={(e:any) => setPassword(e.target.value)} size="lg" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={(e:any) => setConfirmPassword(e.target.value)} size="lg" />
              </Form.Group>
              <Form.Group className="mb-3">
                <div className={styles.blackbtn}>
                  <Button variant="custom" size="lg" type="submit">Sign Up</Button> 
                </div>
              </Form.Group>
            </Form>
          </div>
        </center>
      </div>
    </>
  )
}
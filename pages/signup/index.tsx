import React, {useState, useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import {Form, Button} from 'react-bootstrap'
import { FORMERR } from 'dns'

export default function SignUp(){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return(
    <>
      <div className={styles.authpage}>
        <center>
          <div className={styles.authbox}>
            <Form>
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
                <Form.Control type="password" onChange={(e:any) => setPassword(e.target.value)} size="lg" />
              </Form.Group>
              <Form.Group className="mb-3">
                <div className={styles.blackbtn}>
                  <Button variant="custom" size="lg">Sign Up</Button> 
                </div>
              </Form.Group>
            </Form>
          </div>
        </center>
      </div>
    </>
  )
}
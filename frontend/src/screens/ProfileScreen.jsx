import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Loader from '../components/Loader'
import { Form,Button} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'



const ProfileScreen = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {userInfo} = useSelector(state=>state.auth);
  
  const [updateProfile,{isLoading}] = useUpdateUserMutation();


  useEffect(()=>{
    setName(userInfo.name);
    setEmail(userInfo.email);
  },[userInfo.setName,userInfo.setEmail])

  const submitHandler = async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('password do not match');
    }else{
      try { 
        const res = await updateProfile({
          _id:userInfo._id,
          name,
          email,
          password
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('profile updated')
      } catch (error) {
        toast.error(error.data.message || error.error)
      }
    }
  }
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type='text'
          placeholder="Enter name"
          value={name}
          onChange={e=> setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type='email'
          placeholder="Enter Email"
          value={email}
          onChange={e=> setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control 
          type='password'
          placeholder="Enter password"
          value={password}
          onChange={e=> setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          type='password'
          placeholder="Enter password"
          value={confirmPassword}
          onChange={e=> setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen

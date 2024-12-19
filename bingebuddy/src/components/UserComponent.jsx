import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../services/UserService'
import { useNavigate, useParams} from 'react-router-dom'

const UserComponent = () => {

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')

    const {id} = useParams();
   
    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        email:''
    })

    const navigator = useNavigate(); 

    useEffect(() => 
        {
            if(id){
                getUser(id).then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                }).catch(error => {
                    console.error(error);
                })
            }
        }, {id})


    const handleLastName = (e) => setLastName(e.target.value);
    
    function handleEmail(e){           
        setEmail(e.target.value);
    }

    function saveOrUpdateUser(e){
        e.preventDefault();

        if(validateForm()){       
            
            const user = {firstName, lastName, email}
            console.log(user); 

            if(id){
                updateUser(id, user).then((response) => {
                    console.log(response.data);
                    navigator('/users');    
                }).catch(error => {
                    console.log(error);
                })
            }
            else{       
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch(error => {
                    console.log(error);
                })
            }
        }       
    }


    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}  
        
        if(firstName.trim()){   
            errorsCopy.firstName = '';
        }
        else{       
            errorsCopy.firstName = 'First Name is required';
            valid = 'false';
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }
        else{
            errorsCopy.lastName = 'Last Name is required';
            valid = 'false';
        }

        if(email.trim()){
            errorsCopy.email = '';
        }
        else{
            errorsCopy.email = 'Email is required';
            valid = 'false';
        }

        setErrors(errorsCopy);  
        return valid;
    }

    function pageTitle(){   
        if(id){
            return <h2 className='text-center'>Update User</h2>
        }
        else{
            <h2 className='text-center'>Add User</h2>
        }
    }


  return (
   <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
                pageTitle()  
            }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'> First Name: </label>
                            <input
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}       
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'> Last Name: </label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={handleLastName}
                            >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'> Email: </label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={handleEmail}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateUser}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )  
}

export default UserComponent
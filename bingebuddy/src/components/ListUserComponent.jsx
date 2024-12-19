import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { listUsers } from '../services/UserService'


const ListUserComponent = () => {

    const [users, setUsers] = useState([])
    const navigator = useNavigate(); 


    useEffect(() => {
        getAllUsers();
    }, []) 


    function getAllUsers(){
        listUsers()
        .then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewUser(){
        navigator('/add-user') // when Add Employee button is clicked, will take user to /add-employee page
    }

    function updateUser(id){
        navigator(`/edit-user/${id}`);   // use backtick to enclose url, don't use single quotes
    }


  return (
    <div className='container'>
        <h2 className='text-center header'> BingeBuddy Users List</h2>
        <button className='btn btn-primary mb-2' onClick={addNewUser}>Add User</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map(user => 
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.emailmail}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateUser(user.id)}> Update</button>
                            </td>
                        </tr>)
                }
                <tr>

                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default ListUserComponent
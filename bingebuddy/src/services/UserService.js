import axios from "axios"

// base url for all REST APIs for Employee resource
const REST_API_BASE_URL = 'http://localhost:8080/api/users';

export const listUsers = () => {
    return axios.get(REST_API_BASE_URL);    // client code to get All Employees REST API call
}

// Above function (in a) simplfied (format) into one line since it has only one line i.e. the return statement
// Simplified manner to write above Arrow function
// export const listEmployees = () => axios.get(REST_API_BASE_URL);    

export const createUser = (user) =>axios.post(REST_API_BASE_URL, user);

// Retrieving record from Database based on ID
export const getUser = (userId) => axios.get(REST_API_BASE_URL + '/' + userId);

// Calling Update Employee REST API using axios.put()
// 1st parameter  is employeeId, 2nd parameter is Updated employee object
export const updateUser = (userId, user) => axios.put(REST_API_BASE_URL + '/' + userId, user);


// Delete Employee based on employeeId
export const deleteUser = (userId) => axios.delete(REST_API_BASE_URL + '/' + userId);



import axios from 'axios';
const user = 'vu';
const url = '';
const getStudentEndPoint = ``;
const addStudentEndPoint = ``;
const modifyStudentEndPoint = ``;

export const getStudent = async () => 
    await axios.get(getStudentEndPoint, {
        params: {
            user: user
        }
    });

export const addStudent = async (newStudent) => 
    await axios.get(addStudentEndPoint, {
        user: user,
        newStudent: newStudent
    });

export const modifyStudent = async (modifiedStudent) => 
    await axios.get(modifyStudentEndPoint, {
        user: user,
        modifiedStudent: modifiedStudent
    });
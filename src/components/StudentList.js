import React from 'react';
import style from './StudentList.module.css';
import StudentItem  from './StudentItem';
import { useSelector } from 'react-redux';

export default function StudentList() {
    const studentList = useSelector(state => state.students.studentList);
    const currentPage = useSelector(state => state.pagination.currentPage);
    const searchValue = useSelector(state => state.status.searchValue);
    const searching = useSelector(state => state.status.searching);

    const filterStudentIndexForCurrentPage = () => ([
        (currentPage - 1) * 6,
        (currentPage - 1) * 6 + 1,
        (currentPage - 1) * 6 + 2,
        (currentPage - 1) * 6 + 3,
        (currentPage - 1) * 6 + 4,
        (currentPage - 1) * 6 + 5
    ]);

    const filterStudentMatchedWithSearch = searchValue => 
    studentList.filter(student => student.name.includes(searchValue) 
    || student.phoneNumber.includes(searchValue));
    
    const renderStudentList = () => (
        filterStudentIndexForCurrentPage().filter(index => index < studentList.length)
        .map(item => studentList[item])
        .map(student =>
            <StudentItem 
                key = {student.id}
                student = {student}
            />
        )
    );

    const renderSearchedList = () => {
        const searchedList = filterStudentMatchedWithSearch(searchValue);
        return (
            filterStudentIndexForCurrentPage().filter(index => index < searchedList.length)
            .map(item => searchedList[item])
            .map(student => 
            <StudentItem 
                key = {student.id}
                student = {student}
            />)
        );
    }

    if (searching === false || (searching === true && searchValue === '')) {
        return (
            <div className = {style.list} >
                {renderStudentList()}
            </div>
        );  
    } 
    if (searching === true && filterStudentMatchedWithSearch(searchValue).length !== 0) {
        return (
            <div className = {style.list} >
                {renderSearchedList()}
            </div>
        );
    }
    if (searching === true && filterStudentMatchedWithSearch(searchValue).length === 0) {
        return (
            <div className = {style.list} >
                <p>Không tìm thấy kết quả nào</p>
            </div>
        );
    } 
    
}

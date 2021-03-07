import React from 'react';
import style from './Header.module.css';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { searchStudent, changeSearchingValue } from '../action/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Header() {
    const searchValue = useSelector(state => state.status.searchValue);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleMoveToNewStudentPage = () => {
        history.push('/NewStudent');
    }
    
    return (
        <div className = {style.header}>
            <div className = {style.top_area}>
                <h2>Quản lý sinh viên</h2>
                <button onClick = {handleMoveToNewStudentPage} >
                    <AddIcon className = {style.plus}/>
                    <span>Thêm mới</span>
                </button>
            </div>
            <div className={style.search_area}>
                <input type="text" value = {searchValue} placeholder ="  Type Name or Phone Number" onChange = {e => dispatch(changeSearchingValue(e.target.value))}/>
                <SearchIcon className = {style.search_button} onClick = {() => dispatch(searchStudent())} />
            </div>
        </div>
    );
}
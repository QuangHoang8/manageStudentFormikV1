import React from "react";
import style from "./StudentItem.module.css";
import { Male, Female } from "react-gender";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  editingBirthday,
  editingDayAdmission,
  editingGender,
  editingImg,
  editingName,
  editingPhoneNumber,
  passingID,
} from "../action/actionCreator";

export default function StudentItem({ student }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const showGender = () => {
    if (student.gender === "Nam")
      return <Male color="#419fcf" className={style.genderType} />;
    else return <Female color="#f378ac" className={style.genderType} />;
  };

  const handleBeginModifyStudent = () => {
    dispatch(passingID(student.id));
    dispatch(editingBirthday(student.birthday));
    dispatch(editingPhoneNumber(student.phoneNumber));
    console.log(student.phoneNumber);
    dispatch(editingImg(student.img));
    dispatch(editingDayAdmission(student.dayAdmission));
    dispatch(editingGender(student.gender));
    dispatch(editingName(student.name));

    history.push(`/ModifyStudent/${student.id}`);
  };

  return (
    <div className={style.studentItem} onClick={handleBeginModifyStudent}>
      <div className={style.img_container}>
        <img src={student.img} alt={student.name} />
      </div>
      <div className={style.details_area}>
        <div className={style.name}>{student.name}</div>
        <div className={style.phoneNumber}>{student.phoneNumber}</div>
      </div>
      <div className={style.gender_container}>{showGender()}</div>
    </div>
  );
}

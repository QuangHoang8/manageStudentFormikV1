import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import style from "./NewStudent.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  // editingImg,
  // editingName,
  // editingDayAdmission,
  // editingBirthday,
  // editingPhoneNumber,
  // editingGender,
  saveModifiedList,
} from "../action/actionCreator";
import { useHistory } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ModifyStudent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const studentisModified = useSelector(
    (state) => state.students.studentisModified
  );
  const editorName = useSelector(
    (state) => state.students.studentisModified.name
  );

  const editorPhoneNumber = useSelector(
    (state) => state.students.studentisModified.phoneNumber
  );

  const editorBirthday = useSelector(
    (state) => state.students.studentisModified.birthday
  );
  const editorGender = useSelector(
    (state) => state.students.studentisModified.gender
  );
  const editorDayAdmission = useSelector(
    (state) => state.students.studentisModified.dayAdmission
  );
  const editorImg = useSelector(
    (state) => state.students.studentisModified.img
  );

  const studentList = useSelector((state) => state.students.studentList);

  const handleSaveModify = () => {
    const newModifiedList = studentList.map((student) =>
      student.id === studentisModified.id ? studentisModified : student
    );
    dispatch(saveModifiedList(newModifiedList));
    localStorage.setItem("updatedList", JSON.stringify(newModifiedList));
    history.push("/");
  };

  const handleCancelModify = (formChanged) => {
    if (formChanged) {
      if (window.confirm("Form đã thay đổi bản có muốn hủy")) {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  };

  return (
    <div className={style.newStudent}>
      <div className={style.topbar} onClick={handleCancelModify}>
        <ArrowBackIosIcon className={style.arrowIcon} />
        <h2>Danh sách</h2>
      </div>
      <Formik
        initialValues={{
          img: editorImg,
          name: editorName,
          phoneNumber: editorPhoneNumber,
          birthday: editorBirthday,
          gender: editorGender,
          dayAdmission: editorDayAdmission,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .matches(/[A-Z]|[a-z]/, "Chỉ điền các ký tự là chữ cái")
            .required("Vui lòng nhập tên"),
          phoneNumber: Yup.number()
            .positive()
            .integer()
            .required("Vui lòng nhập số điện thoại"),
          birthday: Yup.date().required("Vui lòng nhập ngày tháng năm sinh"),
          gender: Yup.string().required("Vui lòng chọn giới tính"),
          dayAdmission: Yup.date().required("Vui lòng điền ngày nhập học"),
        })}
        onSubmit={handleSaveModify}
      >
        {({ values, setFieldValue, handleSubmit, isValid, dirty }) => {
          return (
            <React.Fragment>
              <form className={style.form}>
                <div className={style.firstContent}>
                  <div className={style.img_container}>
                    <label htmlFor="imageUpload">
                      <input
                        type="file"
                        id="imageUpload"
                        className={style.file}
                        onChange={(e) => {
                          const urlImg = `./studentImg/${e.target.files[0].name}`;
                          setFieldValue("img", urlImg, true);
                        }}
                      />
                      <img
                        src={values.img}
                        alt={values.name}
                        // onClick={console.log(values.img)}
                      />
                    </label>
                  </div>
                  <Field className={style.standard2} type="text" name="name" />
                </div>
                <ErrorMessage name="name" />
                <div>
                  <label htmlFor="">Ngày sinh</label>
                  <Field
                    className={style.standard1}
                    type="date"
                    name="birthday"
                  />
                </div>
                <div>
                  <label htmlFor="gender">Giới tính</label>
                  <div className={style.gender}>
                    <div>
                      <Field
                        className={style.standard3}
                        type="radio"
                        name="gender"
                        value="Nam"
                      />
                      <label htmlFor="Nam">Nam</label>
                    </div>
                    <div>
                      <Field
                        className={style.standard3}
                        type="radio"
                        name="gender"
                        value="Nữ"
                      />
                      <label htmlFor="Nữ">Nữ</label>
                    </div>
                  </div>
                  <ErrorMessage name="gender" />
                </div>
                <div>
                  <label htmlFor="dateAdmission">Ngày nhập học</label>
                  <Field
                    className={style.standard1}
                    type="date"
                    id="dateAdmission"
                    name="dayAdmission"
                  />
                </div>
                <ErrorMessage name="dayAdmission" />
                <div>
                  <label htmlFor="phoneNumber">Điện thoại</label>
                  <Field
                    className={style.standard1}
                    type="text"
                    name="phoneNumber"
                  />
                </div>
                <ErrorMessage name="phoneNumber" />
              </form>
              <div className={style.button_group}>
                <button
                  className={style.add_butt}
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  Sửa
                </button>
                <button
                  className={style.cancel_butt}
                  onClick={() => {
                    handleCancelModify(dirty);
                  }}
                >
                  Huỷ
                </button>
              </div>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
}

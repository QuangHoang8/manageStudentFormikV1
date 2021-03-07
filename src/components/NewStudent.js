import React from "react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import style from "./NewStudent.module.css";
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { saveStudent } from "../action/actionCreator";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

export default function NewStudent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSaveStudent = (values) => {
    dispatch(saveStudent(values));
    history.push("/");
  };

  const handleCancelAdding = (formChanged) => {
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
      <div className={style.topbar} onClick={handleCancelAdding}>
        <ArrowBackIosIcon className={style.arrowIcon} />
        <h2>Danh sách</h2>
      </div>
      <Formik
        initialValues={{
          img: "./studentImg/default.png",
          name: "",
          phoneNumber: "",
          birthday: "",
          gender: "",
          dayAdmission: "",
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
        // validate={(values) => {
        //   const errors = {};

        //   if (!values.name) {
        //     errors.name = "Vui lòng nhập tên";
        //   }

        //   return errors;
        // }}
        onSubmit={handleSaveStudent}
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
                      <img src={values.img} alt={values.name} />
                    </label>
                  </div>
                  <Field className={style.standard2} name="name" type="text" />
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
                <ErrorMessage name="birthday" />
                <div>
                  <label htmlFor="gender">Giới tính</label>
                  <div className={style.gender}>
                    <div className={style.manCheckBox}>
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
                </div>
                <ErrorMessage name="gender" />
                <div>
                  <label htmlFor="dateAdmission">Ngày nhập học</label>
                  <Field
                    className={style.standard1}
                    type="date"
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
                  disabled={!isValid}
                  className={style.add_butt}
                  onClick={handleSubmit}
                >
                  Thêm
                </button>
                <button
                  className={style.cancel_butt}
                  // enableReinitialize={enableReinitialize}
                  onClick={() => {
                    handleCancelAdding(dirty);
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

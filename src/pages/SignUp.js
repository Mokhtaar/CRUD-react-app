import React from "react";
import { useFormik } from "formik";
import api from "../api";
import * as Yup from "yup";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Must be a valid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("hi", values);
      // const post = { ...values, userId: 1 };
      await api
        .post("/user/signup", values)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  });
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            The best offer <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              for your business
            </span>
          </h1>

          <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First name"
                    name="firstName"
                    id="form1"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </MDBCol>
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p>{formik.errors.firstName}</p>
                ) : null}
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last name"
                    name="lastName"
                    id="form2"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </MDBCol>
              </MDBRow>
              {formik.errors.lastName && formik.touched.lastName ? (
                <p>{formik.errors.lastName}</p>
              ) : null}
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                name="email"
                id="form3"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <p>{formik.errors.password}</p>
              ) : null}
              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Subscribe to our newsletter"
                />
              </div>

              <MDBBtn
                type="submit"
                className="w-100 mb-4"
                size="md"
                onClick={formik.handleSubmit}
              >
                sign up
              </MDBBtn>

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;

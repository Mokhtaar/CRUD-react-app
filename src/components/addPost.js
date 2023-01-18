import React from "react";
import { useDispatch } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import api from "../api";
import * as Yup from "yup";
import { addPost } from "../redux/postSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      body: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const post = { ...values, userId: 1 };
      await api
        .post("/post", post)
        .then((response) => {
          console.log(response.data);
          dispatch(addPost(response.data));
        })
        .catch((error) => console.log(error.response.data.message));
    },
  });
  return (
    <>
      <Button variant='outlined' onClick={handleShow}>
        Add new post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='name@example.com'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
              />
            </Form.Group>
            {formik.errors.title && formik.touched.title ? (
              <p>{formik.errors.title}</p>
            ) : null}
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Body</Form.Label>
              <Form.Control
                as='textarea'
                name='body'
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
              />
            </Form.Group>
            {formik.errors.body && formik.touched.body ? (
              <p>{formik.errors.body}</p>
            ) : null}
            <Modal.Footer>
              <Button className='me-1' variant='outlined' onClick={handleClose}>
                Close
              </Button>

              <Button
                variant='outlined'
                type='submit'
                onClick={
                  !formik.errors.body && !formik.errors.title
                    ? handleClose
                    : null
                }
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPost;

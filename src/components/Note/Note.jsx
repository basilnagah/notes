import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Note({ noteItem, deleteFn, updateNote }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    }
    ,
    onSubmit: () => {
      updateNote(noteItem._id, formik.values)
      handleClose()
      formik.resetForm()

    }
  })


  return (
    <>
      <div className="col-md-4">
        <Card>
          <Card.Body>
            <Card.Title>{noteItem.title}</Card.Title>
            <Card.Text>
              {noteItem.content}
            </Card.Text>
            <Card.Link ><i onClick={handleShow} className="fa-regular fa-pen-to-square" variant="primary"></i></Card.Link>
            <Card.Link ><i className="fa-solid fa-trash" onClick={() => {
              deleteFn(noteItem._id)
            }}></i></Card.Link>
          </Card.Body>
        </Card>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={formik.handleSubmit}>
            <input type="text" placeholder="note title" className="form-control"

              name="title" value={formik.values.title}
              onBlur={formik.handleBlur} onChange={formik.handleChange}

            />
            <textarea placeholder="note content" id="" className="form-control mt-2"
              name="content" value={formik.values.content}
              onBlur={formik.handleBlur} onChange={formik.handleChange}

            ></textarea>

            <button className="btn btn-warning  mt-2 d-block ms-auto">Update</button>
          </form>


        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  )
}

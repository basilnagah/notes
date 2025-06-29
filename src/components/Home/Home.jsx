import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../../Atoms/userAtom";
import { useEffect, useState } from "react";
import Note from "../Note/Note";
import { countNote } from "../../Atoms/countNoteAtom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import { PacmanLoader } from "react-spinners";

export default function Home() {
  let [token] = useRecoilState(userAtom)
  let [noteLength, setNoteLength] = useRecoilState(countNote)
  let [notes, setNotes] = useState([])
  let [isLoading, setIsLoading] = useState(false)




  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  let [notFound, setNotFound] = useState(null)




  let formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    }
    ,
    onSubmit: addNote
  })


  function getNotes() {
    setIsLoading(true)
    setNotFound(null)

    axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
      headers: {
        token: `3b8ny__${token}`
      }
    }).then((res) => {
      if (res.data.msg == "done") {
        setNotes(res.data.notes)
        setNoteLength(res.data.notes.length)
        setIsLoading(false)
      }
    }).catch((err) => {
      console.log(err);
      setNotFound(err.response.data.msg)
      setNoteLength(0)
      setIsLoading(false)


    })
  }



  function addNote(values) {
    console.log(values);

    axios.post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
      headers: {
        token: `3b8ny__${token}`
      }
    }).then((res) => {
      console.log(res);

      if (res.data.msg == "done") {
        handleClose()
        getNotes()
        formik.resetForm()
      }


    }).catch((err) => {
      console.log(err);

    })
  }

  function deleteNote(noteID) {


    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`, {
      headers: {
        token: `3b8ny__${token}`
      }
    }).then((res) => {
      console.log(res);

      if (res.data.msg == "done") {
        getNotes()
      }


    }).catch((err) => {
      console.log(err);

    })
  }



  function updateNote(noteID, values) {

    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`, values, {
      headers: {
        token: `3b8ny__${token}`
      }
    }).then((res) => {
      console.log(res);

      if (res.data.msg == "done") {

        getNotes()

      }


    }).catch((err) => {
      console.log(err);

    })
  }




  useEffect(() => {
    getNotes()
  }, [])




  return (
    <>
      <button onClick={handleShow}
        className=" btn bg-primary text-white d-block ms-auto"
        variant="primary"
      >
        <i className="fa-solid fa-plus me-2 " ></i>
        Add Note
      </button>

      <>

        {isLoading ? <div className="d-flex justify-content-center align-items-center vh-100">
          <PacmanLoader
            color="#195aff"
            size={25}
          />


        </div> :  notFound == null ? <>

          <h2 className="mb-4">Notes</h2>
          <div className="container">
            <div className="row">

              {notes?.map((note) => {
                return <Note noteItem={note} key={note._id} deleteFn={deleteNote} updateNote={updateNote} />

              })}
            </div>
          </div>
          <h6 className="my-3 text-end">Notes Number : {noteLength}</h6>
        </> : <h3 className="text-danger">{notFound}</h3>
        
}










      </>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
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

            <button className="btn btn-primary mt-2 d-block ms-auto">Add</button>
          </form>


        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          {/* <Button variant="primary" onSubmit={formik.handleSubmit} >
            Add
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

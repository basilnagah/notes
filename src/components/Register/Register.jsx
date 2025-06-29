import { useFormik } from "formik";
import signImg from "../../assets/signup-image.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as Yup from "yup"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()
  function handleRegister() { }

  let validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").matches(/^[A-Za-z]{6,15}$/, "Name at least 6 & at most 15"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{6,15}$/, "Password at least 6 & at most 15"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Password at least 6 & at most 15"),
    age: Yup.number().required("Age is required").min(16, "too young").max(75, "too old")

  })


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      age: "",
    },
    onSubmit: handleRegister,
    validationSchema
  });

  async function handleRegister(values) {
    const loading = toast.loading('loadingggg')

    try {
      let res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      console.log(res);
      toast.success('account created successfully')

      setTimeout(() => {
        navigate("/login")

      }, 2000);
    } catch (error) {
      setErrMsg(error.response.data.msg);
      toast.error(error.response.data.msg)

    } finally {
      toast.dismiss(loading)
    }

  }


  return (
    <>
      <div className="row justify-content-around">
        <div className="col-md-5 ">
          <img src={signImg} className="w-100" alt="" />
        </div>
        <div className="col-md-5 text-start">
          <h3 className="my-2">Register Now : </h3>
          {errMsg && <p className="text-danger">{errMsg}</p>}


          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? <p className="text-danger">{formik.errors.name}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? <p className="text-danger">{formik.errors.email}</p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? <p className="text-danger">{formik.errors.password}</p> : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.age && formik.touched.age ? <p className="text-danger">{formik.errors.age}</p> : null}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="phone"


            >

              <Form.Label>Phone </Form.Label>
              <Form.Control type="tel" placeholder="Enter Phone" name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />

              {formik.errors.phone && formik.touched.phone ? <p className="text-danger">{formik.errors.phone}</p> : null}
            </Form.Group>


            <div className="d-flex justify-content-between align-items-center">

              <Button variant="primary" type="submit">
                Submit
              </Button>

              <p className="mt-2">
                Already have account ? <Link to={'/login'} className="text-primary text-decoration-underline">Login</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

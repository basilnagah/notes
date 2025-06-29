import loginImg from "../../assets/signin-image.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";
import { useState } from "react";

import { useRecoilState } from "recoil";
import { userAtom } from "../../Atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

  let [userToken, setUserToken] = useRecoilState(userAtom)
  let navigate = useNavigate()

  let [errMsg, setErrMsg] = useState("")

  let validationSchema = Yup.object().shape({

    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9]{6,15}$/, "Password at least 6 & at most 15"),


  })


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    onSubmit: handleLogin,
    validationSchema
  });

  async function handleLogin(values) {
    const loading = toast.loading('loadingggg')
    try {
      let res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      console.log(res);

      if (res.data.msg == "done") {
        localStorage.setItem("userToken", res.data.token)
        setUserToken(res.data.token)
        toast.success('logged in successfully')
        setTimeout(() => {

          navigate("/")
        }, 2000);

      }
    } catch (error) {
      setErrMsg(error.response.data.msg);
      toast.error(error.response.data.msg)
    } finally {
      toast.dismiss(loading)
    }

  }






  return (
    <>
      <div className="row justify-content-around ">
        <div className="col-md-5 text-start order-lg-0 order-1">
          <h3 className="my-4">Login Now : </h3>

          {errMsg && <p className="text-danger">{errMsg}</p>}

          <Form onSubmit={formik.handleSubmit}>



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



            <div className="d-flex  justify-content-between align-items-center">

              <Button variant="primary" type="submit">
                Submit
              </Button>

              <p className="mt-2">
                don't have an account ? <Link to={'/register'} className="text-primary text-decoration-underline">Register</Link>
              </p>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <img src={loginImg} className="w-100  " alt="" />
        </div>
      </div>
    </>
  );
}

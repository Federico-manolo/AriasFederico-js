"use client";
import { Form, Card, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookieAuth } from "../service_autentificacion/AuthController";
import "../StyleComponents/register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const router = useRouter();

  function updateFormData(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  async function registerUser() {
    try {
      const response = await axios.post(
        "https://cyber-strikers-coachvach.vercel.app/rest/register",
        formData
      );

      const token = response.data.data.token;
      localStorage.setItem("auth_token", token);

      const user = response.data.data.user;
      localStorage.setItem("user_id", user.id);
      const userName = user.name;
      setCookieAuth(userName);

      window.location.href = "/";
    } catch (error:any) {
      if (error.response.status === 422) {
        const errorData = error.response.data;
        setErrors(errorData.errors);
      } else {
        console.log("Error:", error.message);
        // Handle other types of errors here
      }
    }
  }

  return (
    <div className="container register">
    <div className="row">
      <div className="col-md-3 register-left">
        <h3>Bienvenido</h3>
        <p>Estás a tan solo unos simples pasos de empezar a vivir la gran experiencia de SMASH NBA</p>
        <Button href = "/login" className="btnGeneral" >Iniciar Sesión</Button>
        <Button href = "/" className="btnGeneral" >Volver al Inicio</Button>
        <br />
      </div>
      <div className="col-md-9 register-right">
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h3 className="register-heading">Registrarse como Usuario</h3>
            <div className="row register-form">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" name="name" className="form-control" placeholder="Nombre Completo *" onChange={updateFormData}/>
                  {errors.name && <span className="text-danger">{errors.name[0]}</span>}
                </div>
                <div className="form-group">
                  <input type="password" name="password" className="form-control" placeholder="Contraseña *" onChange={updateFormData}/>
                  {errors.password && <span className="text-danger">{errors.password[0]}</span>}
                </div>
                <div className="form-group">
                  <input type="password" name="password_confirmation" className="form-control" placeholder="Confirmación de Contraseña *" onChange={updateFormData} />
                  {errors.password_confirmation && (
                <span className="text-danger">{errors.password_confirmation[0]}</span>)}
                </div>
                <div className="form-group">
                  <input type="email" name="email" className="form-control" placeholder="Tu Email *" onChange={updateFormData} />
                  {errors.email && <span className="text-danger">{errors.email[0]}</span>}
                </div>
              </div>
              <div className="col-md-6">
                <Button className="btnRegister" onClick={registerUser}>Registrar Usuario</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
}

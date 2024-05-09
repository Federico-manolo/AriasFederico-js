'use client';
import { Form, Card, Container, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookieAuth } from "../service_autentificacion/AuthController";
import "../StyleComponents/login.css";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  function updateFormData(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setFormData((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  }

  const loginUser = async () => {
    try {
      const response = await axios.post('https://cyber-strikers-coachvach.vercel.app/rest/login', formData);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const token = response.data.data.token;
        localStorage.setItem("auth_token", token);
        const user = response.data.data.user;
        localStorage.setItem("user_id", user.id);
        const userName = user.name;
        setCookieAuth(userName);
        router.back();
      }
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please check your credentials.");
      } else if ( error.response.status === 422){
        setError("An error occurred during the login process, both password and email imputs are requered"  );
      }
    }
  };

  return (
  <div className="container register">
  <div className="row">
    <div className="col-md-3 register-left">
      <h3>Bienvenido</h3>
      <p>SMASH NBA espera por tu inicio de sesión, recuerda que si aún no posees un usuario, puedes elegir la opción de registro</p>
      <Button href = "/register" className="btnGeneral" >Registrarse</Button>
      <Button href = "/" className="btnGeneral" >Volver al Inicio</Button>
      <br />
    </div>
    <div className="col-md-9 register-right">
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <h3 className="register-heading">Iniciar Sesión</h3>
          <div className="row register-form">
            <div className="col-md-6">
              <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Tu Email *" onChange={(e) => updateFormData(e)}/>
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="Contraseña *" onChange={(e) => updateFormData(e)}/>
              </div>
            </div>
            <div className="col-md-6">
              {error && <div className="text-danger mb-3">{error}</div>}
              <Button onClick={loginUser}>Ingresar</Button>            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>  
  
  );
};

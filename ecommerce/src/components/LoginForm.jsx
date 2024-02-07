import { useState } from "react";
import React from "react";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (email && password){
            setLoggedIn(true);
        }
    };

    return(
        <div>
      <h2>Iniciar Sesión</h2>
      <label>
        Correo Electrónico:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {isLoggedIn && <p>¡Inicio de sesión exitoso!</p>}
    </div>
        );


};

export default LoginForm;

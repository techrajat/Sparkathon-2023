import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const handleLogin=async(event)=>{
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:8000/login", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `email=${document.getElementById('email').value}&password=${document.getElementById('password').value}`
        });
        const jsonRes = await response.json();
        if (response.status === 200){
            localStorage.setItem('token', jsonRes['token']);
            props.setIsLogin(true);
            navigate('/');
        }
        if (response.status === 400){
          document.querySelector('#loginError').innerHTML = jsonRes.error;
        }
        if (response.status === 500){
          console.log(jsonRes.error);
        }
      }

    return (
        <div>
            <form id="loginForm" onSubmit={handleLogin}>
                <div class="container">
                    <label for="uname"><b>Email</b></label>
                    <input type="email" id="email" placeholder="Enter Email ID" name="uname" required />
                    <label for="psw"><b>Password</b></label>
                    <input type="password" id="password" placeholder="Enter Password" name="psw" required />
                    <button type="submit">Login</button>
                </div>
                <div class="container">
                    <a href='/register' type="button" class="regBT">Register here</a>
                </div>
            </form>
            <div id="loginError"></div>
        </div>
    )
}

export default Login;
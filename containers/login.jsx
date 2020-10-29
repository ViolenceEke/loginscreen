import React, { useState } from "react"
import { useCookies } from 'react-cookie';
import { Button, Form, FormGroup, Label, FormControl } from 'react-bootstrap';
import "./style.css";
import drain from './drain.jpg';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await fetch('http://localhost:4000/', {method:'POST',mode: 'cors',headers: {'Content-Type': 'application/json'},body: JSON.stringify({ username, password })}).then((data) => data.text())
      if (JSON.parse(data).success){
      setCookie('userADMIN', JSON.parse(data).key, { path: '/', maxAge:1000*60*60*24*30});
    }
  }
  function handleChange(event) {
    console.log(event.target.value);
  }
  
  return (
    <div className="Login" styles={{ backgroundImage:`url(${drain.jpg})` }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <Label>Имя пользователя</Label>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Label>Пароль</Label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button className="btn" block bSize="large" disable={!validateForm()} type="submit">Авторизация</Button>
      </Form>
    </div>
  )
}

export default Login;

//block bsSize="large" disabled={!validateForm()} type="submit">
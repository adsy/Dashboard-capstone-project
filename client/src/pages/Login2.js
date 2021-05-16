import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  CardHeader,
  CardTitle,
} from "reactstrap";
import "../App.css";
import { AuthContext } from "../App";
import axios from "axios";
import { Alert, Card } from "antd";
import "../css/sizing.css";

function Login() {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const onDismissAlert = () => setVisibleAlert(false);
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [inputValues, setInputValues] = useState({ initialState });

  // set input values
  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  // user clicks login and we send query to the api to login
  // handle response and dispatch the result to the top level to store in state
  useEffect(() => {
    if (inputValues.isSubmitting) {
      // post user details to api and use reponse to output result
      axios.post(
          "http://" + window.location.hostname + ":80/login",
          {},
          { 
            auth: {
              username: inputValues.email,
              password: inputValues.password
            }
          }
        )
        .then((response) => {
          // dispatch response 
          dispatch({
            type: "LOGIN",
            payload: response,
          });
          throw response;
        })
        .catch((error) => {
          if (error.status === 200) {
            setInputValues({
              ...inputValues,
              isSubmitting: false,
              errorMessage: error.status || error,
            });
            setVisibleAlert(false);
          } else {
            localStorage.clear("jwt");
            console.log(error);
            // asign error response data for use within alert component
            setInputValues({
              ...inputValues,
              isSubmitting: false,
              errorMessage: error.response.data,
            });
            setVisibleAlert(true);
          }
        });
    }
  }, [inputValues]);

  function handleSubmit(event) {
    setVisibleAlert(false);
    event.preventDefault();
    setInputValues({
      ...inputValues,
      isSubmitting: true,
      errorMessage: null,
    });
  }

  return (
    <div className="site-card-border-less-wrapper" className="container">
      <div className="login" className="login">
        <Card className="text-center" bordered={false} style={{ width: 500 }}>
          <img className="login-logo" src="/rex-icon2.svg" alt="image" />
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                autoFocus
                className="username-input"
                id="email"
                value={inputValues.email || ""}
                onChange={handleOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                className="password-input"
                id="password"
                value={inputValues.password || ""}
                onChange={handleOnChange}
                type="password"
              />
            </FormGroup>
            <Button id = "loginButton" block color="info" type="submit">
              Login
            </Button>
          </form>
          <div className="logAlert" id = "idAlert">
            {visibleAlert ? (
              <div>
                <Alert
                id = "ErrorAlert"
                  message={inputValues.errorMessage.message}
                  type="error"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;

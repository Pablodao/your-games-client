import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [isUserValid, setIsUserValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserChange = (event) => {
    setIsUserValid(true);
    return setUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setIsPasswordValid(true);
    return setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const loginUser = {
      access: user,
      password: password,
    };
    console.log(loginUser);
    try {
      const response = await loginService(loginUser);
      console.log("response.data",response.data);

      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken);

      authenticateUser();

      //Todo Reenviar al usuario
     navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.errorMessage);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setIsUserValid(false);
    }

    if (!password) {
      setIsPasswordValid(false);
    }
    if (user && password) {
      handleLogin();
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <label>Username or email:</label>
        <input
          type="text"
          name="user"
          value={user}
          onChange={handleUserChange}
        />
        {!isUserValid && <p>This field is required</p>}

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {!isPasswordValid && <p>Invalid password</p>}
        <br />
        {errorMessage && <p>{errorMessage}</p>}
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
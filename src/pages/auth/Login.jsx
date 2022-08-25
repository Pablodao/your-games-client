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

    try {
      const response = await loginService(loginUser);

      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken);

      await authenticateUser();

      //Todo Reenviar al usuario
      navigate("/games");
    } catch (error) {
      navigate("/login");
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
    <div className="wrapper">
      <div className="flex">
        <h1 className="title">Log In</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label>Username or email:</label>
          <input
            type="text"
            name="user"
            value={user}
            onChange={handleUserChange}
          />
          {!isUserValid && <p>This field is required</p>}

   

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isPasswordValid && <p>Invalid password</p>}

          {errorMessage && <p>{errorMessage}</p>}
   
          <button style={{margin: "0 auto"}} className="button" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

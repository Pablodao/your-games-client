import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setIsUsernameValid(true);
    return setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setIsEmailValid(true);
    return setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setIsPasswordValid(true);
    return setPassword(event.target.value);
  };

  const handleSignup = async () => {
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      navigate("/signup");
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex =
      /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

    if (!username) {
      setIsUsernameValid(false);
    }
    if (!email || !emailRegex.test(email)) {
      setIsEmailValid(false);
    }
    if (!password || !passwordRegex.test(password)) {
      setIsPasswordValid(false);
    }
    if (
      username &&
      email &&
      emailRegex.test(email) &&
      password &&
      passwordRegex.test(password)
    ) {
      handleSignup();
    }
  };

  return (
    <div className="wrapper">
      <div className="flex">

        <h1 className="title">Sign Up</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          {!isUsernameValid && <p>Invalid username</p>}

          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && <p>Invalid email</p>}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isPasswordValid && <p>Invalid password</p>}

          {errorMessage && <p>{errorMessage}</p>}

          <button className="button" style={{margin: "0 auto"}} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function IsPrivate(props) {
  const { isUserActive } = useContext(AuthContext);

  if (isUserActive === true) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default IsPrivate;

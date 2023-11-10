import { useUser } from "./UserContext";

const LoggedOut = () => {
  const { login } = useUser();

  const onClickLogin = async () => {};

  return <button onClick={onClickLogin}>Login</button>;
};

export default LoggedOut;

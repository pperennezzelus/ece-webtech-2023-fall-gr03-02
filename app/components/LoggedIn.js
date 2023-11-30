import { useUser } from "./UserContext";

const LoggedIn = () => {
  const { user, logout } = useUser();

  return (
    <div>
      Welcome, {user.username}!<button onClick={logout}>Logout</button>
    </div>
  );
};

export default LoggedIn;

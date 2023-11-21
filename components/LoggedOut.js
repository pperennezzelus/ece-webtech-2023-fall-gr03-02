import React, { useContext } from 'react';
import Context from './UserContext';
import { useRouter } from 'next/router'; // import useRouter

const LoggedOut = () => {
  const { login } = useContext(Context);
  const router = useRouter(); // initialize useRouter

  const onClickLogin = async () => {
    const response = await fetch('pages/api/profile');
    const user = await response.json();
    login(user);
    router.push('/profile'); // redirect to /profile page
  };

  return (
    <div>
      <button onClick={onClickLogin} className="text-white hover:underline" >Please log in.</button>
    </div>
  );
};

export default LoggedOut;

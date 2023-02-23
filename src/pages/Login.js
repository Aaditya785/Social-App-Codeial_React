import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom'


import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  console.log("From Login:=",auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return toast.error('Please Enter Both Email and Passcode');
    }

    const response = await auth.login(email, password);

    if (response.success) {
      toast.success('You Successfully LoggedIn');

    } else {
       toast.error(response.message);
    }

    setLoggingIn(false);
  };

  if(auth.user){
    return <Navigate to="/"/>;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
      <Toaster/>
    </form>
  );
};

export default Login;

import styles from '../styles/register.module.css';

const Register = () => {

  return (
    <form className={styles.resisterForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Register/SignUp</span>

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
        <input
          type="text"
          placeholder="Confirm Paasword..."
          value={password}
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

export default Register;

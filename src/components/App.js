import { BrowserRouter as Router, Redirect, Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';


function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
}
 
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Signup />} />

          {/* <Route path='/setting' element={<Settings />} /> */}

          {/* <Route path='/user/:userId' element={<UserProfile />} /> */}

           <PrivateRoute exact path='/settings'> <Settings /> </PrivateRoute> 

           <PrivateRoute exact path='/user/:userId'> <UserProfile /> </PrivateRoute>  

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

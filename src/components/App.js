import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';


function PrivateRoute({ user, redirectPath = '/login', children }) {
  // const auth = useAuth();
  // console.log("Setting/UserProfile",user);

    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;

}
 
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();
  console.log("App Start:",auth);

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

          <Route path='/settings' element={<PrivateRoute user={auth.user}><Settings/></PrivateRoute>}/>

          <Route path='/user/:userId' element={<PrivateRoute user={auth.user}><UserProfile/></PrivateRoute>} />


          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

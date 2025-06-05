import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import User from './User';
import Admin from './Admin';

import Navbar1 from './components/menu/Navbar1';
import Main from './components/Main';
import Management from './components/Management';
import Events from './components/Events';
import About from './components/About';
import Support from './components/Support';
import Footer from './components/Footer';


function App() {
    const { auth } = useContext(AuthContext);
    console.log('Auth Context:', auth); // Debugging line

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<> <Navbar1 />  <Main /> <Footer /> </>} />
                <Route path="/login" element={<> <Login /> </>} />
                <Route path="/register" element={<> <Register /> </>} />
                <Route path="/management" element={<> <Navbar1 />  <Management /> <Footer /> </>} />
                <Route path="/events" element={<> <Navbar1 /> <Events /> <Footer /> </>} />
                <Route path="/about" element={ <> <Navbar1 /> <About /> <Support /> <Footer /> </>} />

                {/* Authenticated Routes */}
                {auth.isAuthenticated && auth.role === 'admin' && (
                    <Route path="/admin-dashboard/*" element={<Admin />} />
                )}
                {auth.isAuthenticated && auth.role === 'user' && (
                    <Route path="/user-dashboard/*" element={<User />} />
                )}

                {/* Redirect to Dashboard if authenticated */}
                <Route path="*" element={auth.isAuthenticated ? <Navigate to={`/${auth.role}-dashboard`} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

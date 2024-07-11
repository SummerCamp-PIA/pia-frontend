import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoginForm, { loginSchema } from '../components/LoginForm';
import '../styles/login.css'; 
import profilePic from '../assets/images/logo.png';
import { useAuth } from '../service/AuthContext';
// const Login = () => {
//   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       const response = await axios.post('http://localhost:8080/login', values);
//       // Login başarılı olduğunda yapılacak işlemler
//       console.log(response.data);
//     } catch (err) {
//       setErrors({ submit: 'Login failed. Please check your username and password.' });
//     } finally {
//       setSubmitting(false);
//     }
//   };

function Login() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values);
      const jwt = response.data.jwt;
      if (jwt){
        localStorage.setItem('token',jwt);
        //navigate('/home');
        window.location.replace("/home")
      }

      // Kullanıcı rolüne göre yönlendirme
      // if (role === 'admin') {
      //   navigate('/admin-home');
      // } else if (role === 'user') {
      //   navigate('/home');
      // } else {
      //   console.error('Bilinmeyen rol:', role);
      // }
    } catch (err) {
      setErrors({ submit: 'Login failed. Please check your username and password.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              {errors.submit && <div className="error">{errors.submit}</div>}
              <button type="submit" disabled={isSubmitting}>Login</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="image-container">
        <img 
          src={profilePic} 
          alt="Profile" 
          style={{ 
            marginLeft: '-10px', 
            marginTop: '20px' 
          }} 
        />
      </div>
    </div>
  );
};

export default Login;
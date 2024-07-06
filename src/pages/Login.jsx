import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoginForm, { loginSchema } from '../components/LoginForm';
import '../styles/login.css'; 
import profilePic from '../assets/images/logo.png';

const Login = () => {
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('/api/login', values);
      // Login başarılı olduğunda yapılacak işlemler
      console.log(response.data);
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
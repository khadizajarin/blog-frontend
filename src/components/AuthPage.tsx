import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '../lib/firebase.config';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
  });

  const handleSignUp = async (values: { email: string; password: string }) => {
    try {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
     navigate("/posts");
     alert("User created successfully!");
    } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Now TypeScript knows 'err' is an instance of 'Error'
        } else {
          setError("An unknown error occurred.");
        }
      }
  };

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/posts");
      alert("Signed in successfully!");
    } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Now TypeScript knows 'err' is an instance of 'Error'
        } else {
          setError("An unknown error occurred.");
        }
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#91B6D8] to-[#CFE8F2]">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={isSignUp ? handleSignUp : handleSignIn}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-[#ACC9E2] text-white rounded-lg"
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <p className="text-sm">
            {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#91B6D8] font-semibold"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserIcon } from '../components/Icons';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [isDealer, setIsDealer] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim(), isDealer);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your name to access your profile.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
              <input
                id="isDealer"
                name="isDealer"
                type="checkbox"
                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                checked={isDealer}
                onChange={(e) => setIsDealer(e.target.checked)}
              />
              <label htmlFor="isDealer" className="ml-2 block text-sm text-gray-900">
                Log in as a dealer
              </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary btn-animated-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserIcon className="h-5 w-5 text-blue-300 group-hover:text-blue-200" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
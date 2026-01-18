import React, { use } from 'react'
import { loginUser } from '../api'

function Home() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Email:', email)
    console.log('Password:', password) 
    // You can add authentication logic here
    const credentials = { email, password };
    loginUser(credentials)
      .then((data) => {
        console.log("Login successful:", data.token);
        const token = data.token; 
        localStorage.setItem('userToken', token);
        window.location.href = '/taskitems';
      });
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to your account or{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            create one
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>

            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div> */}

          <div>
            <button
              type="submit" onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          New here?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Home
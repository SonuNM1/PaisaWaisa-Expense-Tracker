import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)){
      setError('Please enter a valid email address!') ; 
      return ; 
    }

    if(!password){
      setError('Please enter the password!')
    }

    setError('')

    // Login API call 

  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center space-y-6'>

        {/* Heading */}
      
        <div className='text-center'>
          <h3 className='text-2xl font-semibold text-black'>Welcome Back</h3>
          <p className='text-sm text-slate-700 mt-2'>
            Please enter your details to log in
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleLogin} className='space-y-4'>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email Address'
            placeholder='johndoe@gmail.com'
            type='text'
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 Characters'
            type='password'
          />

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <button type='submit' className='btn-primary mt-2'>
            LOGIN
          </button>

          {/* Signup Link */}

          <p className='text-sm text-slate-800 text-center'>
            Don't have an account?{' '}
            <Link className='font-medium text-primary underline' to='/signup'>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login

// 32 
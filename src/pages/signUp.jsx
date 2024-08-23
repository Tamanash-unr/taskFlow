import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { FormInput } from '../components'
import { createUser } from '../lib/Firebase/firebase'
import { setLoading } from '../lib/Redux/appSlice'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.app.loading)

  const onSubmit = async () => {
    const signUpToast = toast.loading("Creating New User ...")

    try {
      dispatch(setLoading(true))

      if(form.username === '' || form.email === '' || form.password === '' || form.confirmPassword === '') {
        throw new Error("Please Fill all the Fields!")
      } 

      if( form.password !== form.confirmPassword ){
        throw new Error("Passwords do not match!")
      }

      const result = await createUser(form)
      if(!result) return

      if(result.status){
        toast.success("User Created Successfully!", { id: signUpToast })
        navigate("/sign-in");
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast.error(error.message, { id: signUpToast })
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col border-solid border-2 p-4 md:p-8 rounded-lg shadow-[25px_55px_60px_-15px_rgba(0,0,0,0.3)]'>
        <div className='flex items-center m-auto'>
          <img src="/assets/note.png" className='h-[50px] w-[50px] md:h-[80px] md:w-[80px]'/>
          <p className='text-3xl md:text-5xl poppins-extrabold-italic bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text'>
            TaskFlow
          </p>
        </div>
        <p className='my-4 poppins-semibold-italic text-xs md:text-base text-center'>
          Effortless Task Management, Seamless Success
        </p>
        <h2 className='poppins-extrabold text-2xl md:text-3xl float-left'>
          Sign Up
        </h2>
        <div className='my-4 mx-2'>
          <FormInput 
            title="Username"
            placeholder="Enter Username"
            type="text"
            value={form.username}
            inputStyle='w-full'
            handleChangeText={(evt) => { setForm({...form, username: evt.target.value}) }}
          />
          <FormInput 
            title="Email"
            placeholder="Enter your Email"
            type="email"
            value={form.email}
            inputStyle='w-full'
            handleChangeText={(evt) => { setForm({...form, email: evt.target.value}) }}
          />
          <FormInput 
            title="Password"
            placeholder="Create Password"
            type="password"
            isPassword={true}
            value={form.password}
            inputStyle='w-full'
            handleChangeText={(evt) => { setForm({...form, password: evt.target.value}) }}
          />
          <FormInput 
            title="Confirm Password"
            placeholder="Re-Enter Password"
            type="password"
            isPassword={true}
            value={form.confirmPassword}
            inputStyle='w-full'
            handleChangeText={(evt) => { setForm({...form, confirmPassword: evt.target.value}) }}
          />
        </div>
        <button 
          className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white poppins-semibold text-xl w-[80%] md:text-2xl p-2 mx-auto active:opacity-50 disabled:opacity-50'
          onClick={() => onSubmit()}  
          disabled={ loading ? true : false }
        >
          Create Account
        </button>
        <div className='text-center mt-2 poppins-regular text-sm md:text-base'>
          Already have an account? <Link to='/sign-in' className='text-blue-500 text-sm md:text-lg'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
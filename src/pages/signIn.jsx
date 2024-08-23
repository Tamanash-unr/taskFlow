import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { FormInput } from '../components'
import { userSignIn } from '../lib/Firebase/firebase'
import { setLoading, updateUser } from '../lib/Redux/appSlice'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector((state) => state.app.loading)

  const onSubmit = async () => {
    const signInToast = toast.loading("Signing In ...")

    try {
      dispatch(setLoading(true))

      if(form.email === '' || form.password === ''){
        throw new Error("Please Fill all the fields!")
      }

      const result = await userSignIn(form);
      if(!result) return

      if(result.status){
        toast.success('Signed In Successfully!', { id: signInToast })
        dispatch(updateUser(result.user))
        navigate("/")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
        toast.error(error.message, { id: signInToast })
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
          Sign In to Get Started
        </h2>
        <div className='my-4 mx-2'>
          <FormInput 
            title="Email"
            placeholder="Your Email"
            type="email"
            value={form.email}
            inputStyle='w-full'
            handleChangeText={(evt) => { setForm({...form, email: evt.target.value}) }}
          />
          <FormInput 
            title="Password"
            placeholder="Your Password"
            type="password"
            isPassword={true}
            value={form.password}
            inputStyle='w-full'
            handleChangeText={(evt) => { setForm({...form, password: evt.target.value}) }}
          />
        </div>
        <button 
          className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white poppins-semibold text-xl w-[80%] md:text-2xl p-2 mx-auto active:opacity-50 disabled:opacity-50'
          onClick={() => onSubmit()}
          disabled={ loading ? true : false }
        >
          Sign In
        </button>
        <div className='text-center mt-2 poppins-regular text-sm md:text-base'>
          Don't have an account? <Link to='/sign-up' className='text-blue-500 text-sm md:text-lg'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn

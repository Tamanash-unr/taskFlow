import { useState } from 'react'

function FormInput({ title, isPassword, value, placeholder, type, handleChangeText, inputStyle }) {
    const [showPassword, setShowPassword] = useState(false);

    const hideIcon = {
        show: '/assets/eye.png',
        hide: '/assets/eye-hide.png'
    }

  return (
    <div className='my-2 relative'>
        <p className='poppins-semibold'>
            {title}
        </p>
        <input 
            type={showPassword ? 'text' : type} 
            value={value} 
            placeholder={placeholder}
            className={`h-[50px] rounded-lg p-4 my-2 border-solid border-2 border-[#282a30] focus:border-transparent ${inputStyle}`}
            onChange={handleChangeText}
            required 
        />
        {
            isPassword && 
            <button onClick={() => setShowPassword(!showPassword)}>
                <img src={ showPassword ? hideIcon.show : hideIcon.hide } className='absolute top-[46%] right-3 w-[30px] h-[30px]'/>
            </button>
        }
    </div>
  )
}

export default FormInput
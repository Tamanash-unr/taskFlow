import React from 'react'
import { useSelector } from 'react-redux'

const CustomButton = ({ title, buttonStyle, textStyle, doOnClick, iconStyle }) => {
  const loading = useSelector((state) => state.app.loading)

  return (
    <button 
      className={`active:opacity-50 disabled:opacity-50 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white rounded-lg ${buttonStyle}`} 
      onClick={() => doOnClick()}
      disabled={ loading ? true : false }
    >
        <p className={`poppins-regular p-2 ${textStyle}`}>
            { iconStyle && <span className={`${iconStyle}`} />}
            {title}
        </p>
    </button>
  )
}

export default CustomButton
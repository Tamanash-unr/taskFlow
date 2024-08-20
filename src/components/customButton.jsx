import React from 'react'

const CustomButton = ({ title, buttonStyle, textStyle, doOnClick, iconStyle }) => {

  return (
    <button className={`active:opacity-50 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white rounded-lg ${buttonStyle}`} onClick={() => doOnClick()}>
        <p className={`poppins-regular p-2 ${textStyle}`}>
            { iconStyle && <span className={`${iconStyle}`} />}
            {title}
        </p>
    </button>
  )
}

export default CustomButton
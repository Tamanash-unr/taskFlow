import React from 'react'

const EmptyComponent = ({ containerStyle, iconStyle, title, subtitle, titleStyle, subtitleStyle }) => {
  return (
    <div className={`flex flex-col w-full items-center m-4 ${containerStyle}`}>
        <span className={`${iconStyle}`}/>
        <p className={`${titleStyle}`}>
            {title}
        </p>
        <p className={`${subtitleStyle}`}>
            {subtitle}
        </p>
    </div>
  )
}

export default EmptyComponent
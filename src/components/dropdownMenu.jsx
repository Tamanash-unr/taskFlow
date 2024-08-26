import CustomButton from './customButton'

const DropdownMenu = ({ id, options, visible, menuStyle }) => {
    
    return (
        <div 
            className={`flex flex-col absolute text-base min-w-[150px] z-10 bg-white right-0 border-2 border-solid rounded-lg poppins-regular origin-top-right transition ease-in-out ${menuStyle} ${visible ? 'scale-1' : 'scale-0'}`}
        >
            {
                options.map((opt) => { 
                        return <CustomButton
                                    key={`${id}-${opt.title.split(" ").join("")}`}
                                    title={opt.title} 
                                    iconStyle={opt.iconStyle ?? ''} 
                                    textStyle={opt.textStyle ?? ''} 
                                    doOnClick={opt.doOnClick}
                                    buttonStyle={opt.buttonStyle ?? ''}
                                />
                })
            }
        </div>
    )
}

export default DropdownMenu
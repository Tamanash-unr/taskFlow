import React from 'react'

const Task = () => {
  return (
    <div 
        className='mx-2 my-4 border-2 border-solid min-w-[250px] min-h-[80px] max-w-[750px] rounded-xl shadow-[15px_32px_30px_-15px_rgba(0,0,0,0.3)] p-3' 
    >
        <div className='flex justify-between'>
            <p className='text-xl poppins-semibold text-ellipsis line-clamp-1 w-[80%]'>
                Task Heading
            </p>
            <button class="fa-solid fa-ellipsis-vertical text-xl active:opacity-50" />
        </div>
        <p className='poppins-regular p-1 text-ellipsis line-clamp-2 mt-2'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <hr className='border-2 border-solid max-w-[95%] mx-auto my-3'/>
        <div className='flex justify-between px-4 poppins-regular'>
            <p>
                Date/Time
            </p>
            <p>
                Task Status
            </p>
        </div>
    </div>
  )
}

export default Task
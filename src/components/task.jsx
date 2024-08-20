import { useState } from 'react'

import { getFormattedDate } from '../lib/helper';
import CustomButton from './customButton';
import UpdateTask from './updateTask';

const Task = ({ data, containerStyle, hideMenu }) => { 
  const [showOptions, setShowOptions] = useState(false)
  const [showUpdateTask, setShowUpdateTask] = useState(false)

  const date = getFormattedDate(data.completionDate)

  const updateOption = () => {
    setShowOptions(false)
    setShowUpdateTask(true)
  }

  const taskStatus = {
    in_progress: <div className='text-amber-500'><i class="fa-regular fa-clock" /> In Progress</div>,
    completed: <div className='text-green-400'><i class="fa-solid fa-check" /> Completed</div>,
    not_started: <div className='text-sky-500'><i class="fa-solid fa-hourglass" /> Not Started</div>,
  }
    
  return (
    <div 
        className={`mx-2 my-4 border-2 border-solid min-h-[80px] max-w-[750px] rounded-xl shadow-[15px_32px_30px_-15px_rgba(0,0,0,0.3)] p-3 ${ containerStyle }`}
        onMouseLeave={() => setShowOptions(false)} 
    >
        <div className='flex justify-between'>
            <p className='text-xl poppins-semibold text-ellipsis line-clamp-1 w-[80%]'>
                { data.title }
            </p>
            {   
                !hideMenu ?
                <div class="active:opacity-50 relative cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
                    <i className='fa-solid fa-ellipsis-vertical text-xl '/>
                    <div className={`flex flex-col absolute text-base min-w-[150px] z-10 bg-white right-0 border-2 border-solid rounded-lg poppins-regular origin-top-right transition ease-in-out ${showOptions ? 'scale-1' : 'scale-0'}`}>
                        <CustomButton title="Update Status" textStyle="p-2" doOnClick={updateOption}/>
                        <CustomButton title="Delete Task" iconStyle="fa-regular fa-trash-can mx-1" textStyle="p-2 text-red-600" />
                    </div>
                </div>:
                <></>
            }
            
        </div>
        <p className='poppins-regular p-1 text-ellipsis line-clamp-2 mt-2'>
            { data.description }
        </p>
        <hr className='border-2 border-solid max-w-[95%] mx-auto my-3'/>
        <div className='flex justify-between px-4 poppins-regular'>
            <p>
                { date }
            </p>
            <p>
                { taskStatus[data.status] }
            </p>
        </div>

        {
            showUpdateTask && <UpdateTask onClose={setShowUpdateTask} task={data}/>
        }    
    </div>
  )
}

export default Task
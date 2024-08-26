import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { getFormattedDate, fetchTasks } from '../lib/helper';
import { deleteTask } from '../lib/Firebase/firebase';
import { updateTasks } from '../lib/Redux/appSlice';
import CustomButton from './customButton';
import UpdateTask from './updateTask';
import DropdownMenu from './dropdownMenu';

const Task = ({ data, containerStyle, hideMenu }) => { 
  const [showOptions, setShowOptions] = useState(false)
  const [showUpdateTask, setShowUpdateTask] = useState(false)
  const [isOverdue, setIsOverdue] = useState(false)
  const dispatch = useDispatch()
  const date = getFormattedDate(data.completionDate)

  useEffect(()=>{
    checkOverdue()
  },[])

  const updateOption = () => {
    setShowOptions(false)
    setShowUpdateTask(true)
  }

  const handleDeleteTask = async () => {
    const toastId = toast.loading("Deleting Task ...")

    try {
        setShowOptions(false)
        const result = await deleteTask(data)
        if(!result) return

        if(result.status) {
            const data = await fetchTasks();
            if(data) { dispatch(updateTasks(data)) }

            toast.success("Task Deleted!", { id: toastId })
        } else {
            throw new Error(result.message)
        }
    } catch (error) {
        toast.error(error.message, { id: toastId })
    }
  }

  const checkOverdue = () => {
    const completion = new Date(data.completionDate)
    const today = new Date()

    if(today > completion) {
        setIsOverdue(true)
    } 
  }

  const taskStatus = {
    in_progress: <div className='text-amber-500 text-sm md:text-base'><i className="fa-regular fa-clock" /> In Progress</div>,
    completed: <div className='text-green-400 text-sm md:text-base'><i className="fa-solid fa-check" /> Completed</div>,
    not_started: <div className='text-sky-500 text-sm md:text-base'><i className="fa-solid fa-hourglass" /> Not Started</div>,
  }
    
  return (
    <div 
        className={`mx-2 my-4 border-2 border-solid min-h-[80px] rounded-xl shadow-[15px_32px_30px_-15px_rgba(0,0,0,0.3)] p-3 ${ containerStyle }`}
        onMouseLeave={() => setShowOptions(false)} 
    >
        <div className='flex justify-between h-[20%]'>
            <p className='text-lg md:text-xl poppins-semibold text-ellipsis line-clamp-1 w-[80%]'>
                { data.title }
            </p>
            {   
                !hideMenu ?
                <div className="active:opacity-50 relative cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
                    <i className='fa-solid fa-ellipsis-vertical text-lg md:text-xl '/>
                    {/* <div className={`flex flex-col absolute text-base min-w-[150px] z-10 bg-white right-0 border-2 border-solid rounded-lg poppins-regular origin-top-right transition ease-in-out ${showOptions ? 'scale-1' : 'scale-0'}`}>
                        <CustomButton title="Update Status" textStyle="p-2" doOnClick={updateOption}/>
                        <CustomButton title="Delete Task" iconStyle="fa-regular fa-trash-can mx-1" textStyle="p-2 text-red-600" doOnClick={handleDeleteTask} />
                    </div> */}
                    <DropdownMenu
                        id={data.id} 
                        options={[
                            { title: "Update Status", textStyle: "p-2", doOnClick: updateOption },
                            { title: "Delete Task", iconStyle: "fa-regular fa-trash-can mx-1", textStyle: "p-2 text-red-600", doOnClick: handleDeleteTask }
                        ]}
                        visible={showOptions}
                    />
                </div>:
                <></>
            }
            
        </div>
        <p className='poppins-regular p-1 text-sm md:text-base text-ellipsis line-clamp-2 mt-2 h-[35%]'>
            { data.description }
        </p>
        <hr className='border-2 border-solid max-w-[95%] mx-auto my-3'/>
        <div className='flex justify-between text-sm md:text-base items-center md:px-4 poppins-regular h-[10%]'>
            <p>
                { date }
            </p>
            {
                isOverdue &&
                <div className='flex items-center poppins-regular text-sm md:text-lg animate-pulse text-red-600 my-0'>
                    <i className="fa-solid fa-triangle-exclamation mx-1" />
                    Overdue
                </div>
            }
            <div>
                { taskStatus[data.status] }
            </div>
        </div>

        {
            showUpdateTask && <UpdateTask onClose={setShowUpdateTask} task={data} />
        }    
    </div>
  )
}

export default Task
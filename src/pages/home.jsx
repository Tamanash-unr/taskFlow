import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'

import { Task, UpcomingTasks } from '../components'
import { fetchTasks } from '../lib/helper'
import { updateTasks } from '../lib/Redux/appSlice'

import { generateUID } from '../lib/helper'

const Home = () => {
  const user = useSelector((state) => state.app.user)
  const tasks = useSelector((state) => state.app.tasks)

  const [isMobile, setIsMobile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
      navigate('/sign-in')
    }

    handleFetchTasks()

    if(document.body.clientWidth < 750){
      setIsMobile(true)
    }
  }, [])

  const handleFetchTasks = async () => {
    const data = await fetchTasks()

    if(data){
      dispatch(updateTasks(data))
    }
  }

  return (
    <div className='flex flex-col my-6 mx-auto w-full md:w-[80%] '>
      <div className='flex items-center w-full'>
        <div className='w-12 h-12 md:w-14 md:h-14 flex items-center justify-center ml-2'>
          <img src="/assets/note.png" />
        </div>
        <div className='flex flex-col mx-2'>
          <div className='text-sm md:text-lg poppins-regular'>
            Welcome!
          </div>
          <div className='text-lg md:text-2xl poppins-semibold'>
            {user ? user.displayName : ''}
          </div>
        </div>
        {
          !isMobile ? 
          <>
            <button className='flex ml-auto p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center'>
              <i className="fa-solid fa-rectangle-list mr-2 text-xl"/>
              Create New Task
            </button>
            <button className='flex p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center' onClick={() => console.log(generateUID())}>
              <i className="fa-solid fa-right-from-bracket mr-2 text-xl" />
              Sign Out
            </button>
          </> :
          <div className='ml-auto mr-4 relative'>
            <button className='active:opacity-50'>
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
            <div className='flex flex-col absolute right-0 w-64 z-10 bg-white border-2 border-solid rounded-xl'>
              <button className='flex p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center'>
                <i className="fa-solid fa-rectangle-list mr-2 text-xl"/>
                Create New Task
              </button>
              <button className='flex p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center'>
                <i className="fa-solid fa-right-from-bracket mr-2 text-xl" />
                Sign Out
              </button>
            </div>
          </div>
        }
      </div>

      <UpcomingTasks tasks={tasks}/>

      <div className='flex flex-col mx-4 mt-10'>
        <div className='flex justify-between mx-8'>
          <p className='text-2xl poppins-semibold'>
            All Tasks
          </p>
          <button className='text-regular poppins-regular active:opacity-50' onClick={() => handleFetchTasks()}>
            <i className="fa-solid fa-filter mx-1" />
            Filter
          </button>
        </div>
        <div className='mx-auto grid grid-cols-2'>
          {
            tasks ?
            tasks.allTasks.map((task) => (
              <Task data={task} key={task.id} containerStyle="min-w-[250px] md:min-w-[700px]" />
            )) :
            <></>
          }
        </div>
      </div>  
    </div>
  )
}

export default Home
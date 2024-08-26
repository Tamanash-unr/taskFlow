import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import { Task, UpcomingTasks, CreateTask } from '../components'
import { fetchTasks } from '../lib/helper'
import { updateTasks, updateUser } from '../lib/Redux/appSlice'
import { toggleCreateTask, setFilter } from '../lib/Redux/uiSlice'
import { userSignOut } from '../lib/Firebase/firebase'

import { DropdownMenu } from '../components'

const Home = () => {
  const user = useSelector((state) => state.app.user)
  const tasks = useSelector((state) => state.app.tasks)
  const { createTaskUI, taskFilter } = useSelector((state) => state.ui)

  const [isMobile, setIsMobile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
      navigate('/sign-in')
      return
    }

    handleFetchTasks()

    if(document.body.clientWidth < 750){
      setIsMobile(true)
    }
  }, [user])

  const handleFetchTasks = async () => {
    const data = await fetchTasks()

    if(data){
      dispatch(updateTasks(data))
    }
  }

  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...')

    try {
      const result = await userSignOut();
      if(!result) return

      if(result.status){
        dispatch(updateUser({}))
        dispatch(updateTasks(null))

        toast.success('Signed out successfully', { id: toastId })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast.error(error.message, { id: toastId })
    }
  }

  const changeFilter = (filter) => {
    setShowFilter(false)
    dispatch(setFilter(filter))
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
            <button 
              className='flex ml-auto p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center'
              onClick={() => dispatch(toggleCreateTask(true))}
            >
              <i className="fa-solid fa-rectangle-list mr-2 text-xl"/>
              Create New Task
            </button>
            <button 
              className='flex p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center' 
              onClick={() => handleSignOut()}
            >
              <i className="fa-solid fa-right-from-bracket mr-2 text-xl" />
              Sign Out
            </button>
          </> :
          <div className='ml-auto mr-4 relative'>
            <button className='active:opacity-50' onClick={() => setShowMenu(!showMenu)}>
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
            <div className={`flex flex-col absolute right-0 w-64 z-10 bg-white border-2 border-solid rounded-xl ${ showMenu ? 'scale-1' : 'scale-0'}`}>
              <button 
                className='flex p-3 active:bg-gradient-to-r from-cyan-500 to-blue-500 active:text-white poppins-regular rounded-lg items-center'
                onClick={() => dispatch(toggleCreateTask(true))}
              >
                <i className="fa-solid fa-rectangle-list mr-2 text-xl"/>
                Create New Task
              </button>
              <button 
                className='flex p-3 active:bg-gradient-to-r from-cyan-500 to-blue-500 active:text-white poppins-regular rounded-lg items-center'
                onClick={() => handleSignOut()}
              >
                <i className="fa-solid fa-right-from-bracket mr-2 text-xl" />
                Sign Out
              </button>
            </div>
          </div>
        }
      </div>

      <UpcomingTasks tasks={tasks}/>

      <div className='flex flex-col mx-4 mt-10'>
        <div className='flex justify-between mx-2 md:mx-8'>
          <p className='text-2xl poppins-semibold'>
            All Tasks
          </p>
          <div className='relative'>
            <button className='text-regular poppins-regular active:opacity-50' onClick={() => setShowFilter(!showFilter)}>
              <i className="fa-solid fa-filter mx-1" />
              Filter
            </button>
            <DropdownMenu
              id={user ? user.uid : ''} 
              options={[
                { title: "All Tasks", iconStyle: "fa-solid fa-layer-group mr-2", textStyle: "p-3 text-sm md:text-base", buttonStyle: "w-full", doOnClick: () => changeFilter("all_tasks") },
                { title: "Not Started", iconStyle: "fa-solid fa-hourglass mr-2", textStyle: "p-3 text-sky-500 hover:text-white text-sm md:text-base", buttonStyle: "w-full", doOnClick: () => changeFilter("not_started") },
                { title: "In Progress", iconStyle: "fa-regular fa-clock mr-2", textStyle: "p-3 text-amber-500 hover:text-white text-sm md:text-base", buttonStyle: "w-full", doOnClick: () => changeFilter("in_progress") },
                { title: "Completed", iconStyle: "fa-solid fa-check mr-2", textStyle: "p-3 text-green-400 hover:text-white text-sm md:text-base", buttonStyle: "w-full", doOnClick: () => changeFilter("completed") },
              ]}
              visible={showFilter}
            />
          </div>
        </div>
        <div className='mx-auto grid md:grid-cols-2'>
          {
            tasks ?
            tasks.allTasks.map((task) => {
              if(taskFilter === 'all_tasks' || taskFilter === task.status){
                return <Task data={task} key={task.id} containerStyle="min-w-[250px] md:min-w-[700px]" />
              }
            }) :
            <></>
          }
        </div>
      </div> 
      {
        createTaskUI && 
        <CreateTask />
      } 
    </div>
  )
}

export default Home
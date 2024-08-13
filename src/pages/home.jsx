import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom' 

const Home = () => {
  const user = useSelector((state) => state.app.user)
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/sign-in')
    }
  }, [])

  return (
    <div className='flex flex-col my-6 mx-auto w-full md:w-[80%] border-2 border-solid'>
      <div className='flex items-center w-full'>
        <div className='fas fa-user text-2xl w-12 h-12 flex items-center justify-center bg-amber-400 rounded-full text-white ml-2'/>
        <div className='flex flex-col mx-2'>
          <div className='text-lg poppins-regular'>
            Welcome!
          </div>
          <div className='text-2xl poppins-semibold'>
            {user ? user.displayName : ''}
          </div>
        </div>
        <button className='flex ml-auto p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center'>
          <i className="fa-solid fa-rectangle-list mr-2 text-xl"/>
          Create Task
        </button>
        <button className='flex p-3 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white poppins-regular rounded-lg items-center'>
          <i class="fa-solid fa-right-from-bracket mr-2 text-xl" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Home
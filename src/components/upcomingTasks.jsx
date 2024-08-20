import Task from "./task"

const UpcomingTasks = ({ tasks }) => {


  return (
    <div className="mx-4">
        <p className="text-xl poppins-semibold mt-10 mb-4">Upcoming Tasks</p>
        <div className="flex overflow-hidden overflow-x-scroll" style={{ scrollbarWidth: "thin" }}>
            {
                tasks ?
                tasks.allTasks.map((task) => {
                if(task.status !== 'completed') {
                    return <Task data={task} key={task.id} containerStyle="w-[550px]" hideMenu={true} />
                }    
            }) :
                <></>
            }
        </div>
    </div>
  )
}

export default UpcomingTasks
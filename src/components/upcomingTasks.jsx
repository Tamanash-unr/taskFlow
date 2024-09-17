import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Task from "./task"
import EmptyComponent from './emptyComponent'

const UpcomingTasks = ({ tasks, taskToDisplay = 6 }) => {
    const { isMobile } = useSelector((state) => state.ui)

    const [canScrollLeft, setScrollLeft] = useState(false)
    const [canScrollRight, setScrollRight] = useState(false)
    const [scrollValue, setScrollValue] = useState(0)

    const unfinishedTasks = tasks ? tasks.allTasks.filter((task) => task.status !== 'completed') : []
    const filteredArray = unfinishedTasks.splice(0, taskToDisplay);

    const taskContainerRef = useRef();

    useEffect(() => {
        if(scrollValue > 0){
            setScrollLeft(true)
        } else {
            setScrollLeft(false)
        }

        if(scrollValue >= taskContainerRef.current.scrollLeftMax){
            setScrollRight(false)
        } else {
            setScrollRight(true)
        }
    },[taskContainerRef, scrollValue, filteredArray])

    const scrollToLeft = () => {
        taskContainerRef.current.scrollBy({
            left: isMobile ? 325 : 500,
            behavior: "smooth",
        })

        setScrollValue(isMobile ? scrollValue + 325 : scrollValue + 500)
    }

    const scrollToRight = () => {
        taskContainerRef.current.scrollBy({
            left: isMobile ? -325 : -500,
            behavior: "smooth",
        })

        setScrollValue(isMobile ? scrollValue - 325 : scrollValue - 500)
    }

    return (
    <div className="mx-4">
        <p className="text-xl poppins-semibold mt-10 mb-4">Upcoming Tasks</p>
        <div className="relative">
            {   
                canScrollLeft &&
                <div 
                    className="absolute flex w-10 h-10 left-0 top-1/2 rounded-full bg-white border-2 border-solid border-black justify-center items-center cursor-pointer animate-bounce"
                    onClick={() => scrollToRight()}
                >
                    <span className="fa-solid fa-chevron-left text-2xl" />
                </div>
            }
            <div ref={taskContainerRef} className="flex overflow-hidden overflow-x-scroll" style={{ scrollbarWidth: "thin" }}>
                {
                    filteredArray.length > 0 ?
                    filteredArray.map((task) => {
                        return <Task data={task} key={task.id} containerStyle="min-w-[310px] md:min-w-[480px]" hideMenu={true} />
                    }) :
                    <EmptyComponent 
                        title="No Upcoming Tasks"
                        titleStyle="text-gray-400 poppins-semibold"
                        iconStyle="fa-regular fa-clipboard text-4xl text-gray-400"
                    />
                }
            </div>
            {   
                canScrollRight &&
                <div
                    className="absolute flex w-10 h-10 right-0 top-1/2 rounded-full bg-white border-2 border-solid border-black justify-center items-center cursor-pointer animate-bounce"
                    onClick={() => scrollToLeft()}
                >
                    <span className="fa-solid fa-chevron-right text-2xl" />
                </div>
            }
        </div>
    </div>
    )
}

export default UpcomingTasks
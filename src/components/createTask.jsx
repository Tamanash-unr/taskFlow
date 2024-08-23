import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { fetchTasks } from "../lib/helper"
import { createTask } from "../lib/Firebase/firebase"
import { setLoading, updateTasks } from "../lib/Redux/appSlice"
import { toggleCreateTask } from '../lib/Redux/uiSlice'

import FormInput from "./formInput"
import CustomButton from "./customButton"
import toast from 'react-hot-toast'

const CreateTask = () => {

    const [createForm, setCreateForm] = useState({
        title: '',
        description: '',
        status: 'not_started',
        completionDate: ''
    })

    const [showAnim, setShowAnim] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        setShowAnim(true)
    }, [])
    
    const handleCreateTask = async () => {
        if(createForm.title === '' || createForm.description === '' || createForm.status === '' || createForm.completionDate === ''  ) {
            return toast.error("Please Fill all the fields!")
        }

        const toastId = toast.loading("Creating a new Task...")

        try {
            dispatch(setLoading(true))
            const result = await createTask(createForm)
            if(!result) return

            if(result.status){
                toast.success("Task Created Successfully!", { id: toastId })

                const data = await fetchTasks();
                if(data) { dispatch(updateTasks(data)) }

                setShowAnim(false)
            } else {
                throw new Error(result.message)
            }
        } catch (error) {
            toast.error(error.message, { id: toastId })
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div 
            className={`fixed z-10 w-full h-full left-0 top-0 flex justify-center transition ease-in-out ${ showAnim ? 'translate-y-0' : 'translate-y-full' }`}
            onTransitionEnd={() => { if(!showAnim) dispatch(toggleCreateTask(false)) }}
        >
            <div className="h-full w-full blur-2xl bg-black opacity-50 fixed"/>
            <div className="relative z-10 rounded-lg bg-white border-2 border-solid m-auto min-w-[500px] p-4">
                <div className="flex justify-between poppins-semibold text-xl">
                    <p>Create New Task</p>
                    <button 
                        className="fa-solid fa-xmark active:opacity-50 disabled:opacity-50" 
                        onClick={() => setShowAnim(false)}
                    />
                </div>
                <div className="mt-6">
                    <FormInput 
                        title="Task Name" 
                        value={createForm.title} 
                        placeholder="Enter Task Name" 
                        handleChangeText={(evt) => setCreateForm({...createForm, title: evt.target.value})}
                        inputStyle="w-full"
                    />
                    <div>
                        <p className='poppins-semibold'>Task Description</p>
                        <textarea 
                            rows="4" 
                            cols="50" 
                            onChange={(evt) => setCreateForm({...createForm, description: evt.target.value})} 
                            value={createForm.description}
                            className="border-2 border-solid border-black p-2 rounded-lg my-2 resize-none focus:border-white"
                            style={{scrollbarWidth: "thin" }}
                            required 
                        />
                    </div>
                    <div className="my-2">
                        <p className='poppins-semibold'>Task Status</p>
                        <select 
                            id="taskStatus" 
                            className="w-full p-3 rounded-lg my-2 border-2 border-solid border-black focus:border-blue-500 bg-white poppons-regular"
                            defaultValue="not_started"
                            onChange={(evt) => setCreateForm({...createForm, status: evt.target.value})}
                        >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <p className='poppins-semibold'>Completion Date</p>
                        <input 
                            type="date" 
                            className="relative w-full cursor-text p-2 my-2 rounded-lg poppins-regular border-2 border-solid border-black focus:border-white"
                            value={createForm.completionDate} 
                            onChange={(evt) => setCreateForm({...createForm, completionDate: evt.target.value})} 
                            required
                        />
                    </div>
                    <CustomButton 
                        title="Create Task" 
                        buttonStyle="bg-gradient-to-r p-2 w-full mt-4" 
                        textStyle="text-white text-lg" 
                        doOnClick={() => handleCreateTask()}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateTask
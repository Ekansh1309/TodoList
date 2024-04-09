import { createSlice } from "@reduxjs/toolkit";

// Function to get data from local Storage
function getLocalData(){
    let newData= localStorage.getItem("TodoList")
    const parsedData = JSON.parse(newData)
    if(!Array.isArray(parsedData.tasks)){
        return {tasks:[],val:1}
    }
    else return parsedData
}

// Task Slice 
export const TasksSlice= createSlice({
    name:"taskstore",
    initialState:getLocalData(),
    // initialState:{
    //     tasks:[],
    //     val:1
    // },
    reducers:{
        // addTask is used to add new task in the store
        addTask: (state, action) => {
            let newTask = action.payload;
            let newTasks = [...state.tasks, newTask];
            console.log(newTasks)
            return {
                ...state,
                tasks: newTasks
            };
        },
        // delete task from the store
        deleteTask:(state,action)=>{
            const taskId = action.payload;
            let newTasks = state.tasks.filter((task) => task.id !== taskId);
            return {
                ...state,
                tasks: newTasks
            };
        },
        // setList is used to set task isCompleted key of the task
        // that particular task can be find using id
        setList: (state, action) => {
            const { id, isCompleted } = action.payload;
            console.log(id,isCompleted)
            console.log(state)

            // Find the index of the task with the matching id
            const taskIndex = state.tasks.findIndex(task => task.id === id);
            // If the task with the given id is found
            if (taskIndex !== -1) {
                // Create a copy of the task with the updated isCompleted property
                const updatedTask = {
                    ...state.tasks[taskIndex],
                    isCompleted: isCompleted
                };
                // Create a copy of the tasks array with the updated task
                const updatedTasks = [...state.tasks];
                updatedTasks[taskIndex] = updatedTask;
                // Return the updated state with the tasks array
                return {
                    ...state,
                    tasks: updatedTasks
                };
            }
            // If the task with the given id is not found, return the current state
            return state;
        },
        setVal:(state,action)=>{
            const value=action.payload
            return{
                ...state,
                val:value+1
            }
        }
    }
})

export const {addTask,deleteTask,setList,setVal} =TasksSlice.actions;
export default TasksSlice.reducer
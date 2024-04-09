import React from "react";
import TaskList from "./components/TaskList";
import CreateModal from "./modals/CreateModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
const App = () => {

  
  // task store
  const {taskstore} = useSelector((state)=>state)
  
  // used to give Ids
  const [val,setVal] = useState(taskstore.val);

  // if any change happens in taskstore then set it in local storage
  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(taskstore));
  }, [taskstore]);
  // TaskList is a component which helps to view all the task
  // CreateModal is a Modal which is used to create new task
  return (
    <div className="flex border-3 flex-col items-center">
      <h1 className="w-full  h-[1/5] font-bold flex justify-center items-center text-center">My Tasks</h1>
      <TaskList val={val} setVal={setVal} />
      <CreateModal val={val} setVal={setVal}/>
    </div>
  )
};

export default App;

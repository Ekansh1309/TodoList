import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrCheckbox } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, setList } from '../redux/slices/tasksSlice';
import toast from 'react-hot-toast';

export default function List({task}) {
  const dispatch = useDispatch()
  // 
  return (
    <>
      <MDBCard className="flex flex-col items-center" >
      {/* if the task is completed, shows green colour */}
        <MDBCardBody className= {` border-2 rounded-lg my-3 ${task.isCompleted ? `bg-green-400` : ``}`}>
          <MDBCardTitle className="font-bold">{task.title}</MDBCardTitle>
          <MDBCardText>{task.description}</MDBCardText>
          <div className='w-[500px] flex justify-between'>
                <div onClick={()=>{
                  // whenever we click on delete icon, deleteTask reducer calls
                  toast.error("Task Deleted Successfully")
                  dispatch(deleteTask(task.id))
                }}>
                  <MdOutlineDeleteForever className='text-3xl cursor-pointer' />
                </div>
                {
                  // if task is completed then show checked icon
                    task.isCompleted  &&  
                    <div className="cursor-pointer" onClick={()=> dispatch(setList({ id: task.id, isCompleted: false })) }>
                        <GrCheckboxSelected className='text-3xl'  />
                    </div>
                }
                {
                  // if task is not completed then show unchecked icon
                    !task.isCompleted  &&
                    <div className="cursor-pointer" onClick={()=> {
                      toast.success("Task Completed")
                      // setList reducer is called
                      dispatch(setList({ id: task.id, isCompleted: true }))
                      } } >
                        <GrCheckbox className='text-3xl' />
                    </div>
                }
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
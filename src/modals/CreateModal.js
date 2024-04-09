import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux'
import { addTask,setVal } from '../redux/slices/tasksSlice';
import toast from 'react-hot-toast';

export default function CreateModal() {
  const {taskstore} = useSelector((state)=>state)
  // modal is active or not
  const [basicModal, setBasicModal] = useState(false);

  // used to toggle modal
  const toggleOpen = () => setBasicModal(!basicModal);

  // task details
  const [formData,setFormData] = useState({
    id:taskstore.val,
    title:"",
    description:"",
    isCompleted:false
  })

  // const {Tasks} = useSelector((state)=>state)
  const dispatch = useDispatch()

  // handle event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler
  function handleSubmit(e){
    e.preventDefault();

    // add task in the store
    dispatch(addTask(formData))

    // default set the form
    setFormData({
      id:taskstore.val+1,
      title:"",
      description:"",
      isCompleted:false
    })
    dispatch(setVal(taskstore.val))
    
    toast.success("Task Created SuccessFully")
    // Toast 

    setBasicModal(false)
  }

  return (
    <>
      <MDBBtn onClick={toggleOpen}>Create Task</MDBBtn>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Task Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {/* form to create task */}
                <form >
                    <label htmlFor="title" className="block text-sm font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                    <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </form>
            </MDBModalBody>

            <MDBModalFooter>
              {/* close modal button */}
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              {/* create task button */}
              <MDBBtn onClick={handleSubmit}>Create</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
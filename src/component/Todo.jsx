// import { Grid, Item } from '@mui/material';
import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
// import { Col, Container } from 'react-bootstrap';
import todo_pic from './Images/Tick.svg';
import './style.css';
import toast, { Toaster } from 'react-hot-toast';


// get the data form localstorage
const getLocalItem = () => {
    let list = localStorage.getItem('lists' );
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}
// const setItem =()=>{
//     let CompleteItems= localStorage.getItem();
//     if(CompleteItems){
//         return JSON.parse(localStorage.getItem({isDel:true}))
//     }
//     else{
//         return[];
//     }
// }

function Todo() {


    //holding all the tasks
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItem());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [UpdateEditItem, setUpdateEditItem] = useState(null);
    const [toggleDel, setToggleDel] = useState(true);
    const addItems = () => {
        try {
            if (!inputData) {
                toast.error("Kindly Enter a Task");
            } else if (inputData && !toggleSubmit) {
                setItems(
                    items.map((elem) => {
                        if (elem.id == UpdateEditItem) {
                            return { ...elem, name: inputData, isDel:false }
                        }
                        return elem;
                    })
                )
                setToggleSubmit(true);
                setInputData('');
                setUpdateEditItem(null);
            }
            else {
                const allInputData = { id: new Date().getTime().toString(), name: inputData, isDel:false}
                setItems([...items, allInputData]);
                setInputData('');
            }
        }
        catch (error) {
            console.log("error", error);
        }

    }
    //complete item
    const completeItem = (id)=>{
        try{
            setItems(
            items.map((elem) => {
                if (elem.id == id) {
                    return { ...elem, isDel:true }
                }
                return elem;
            })
        )
    }
        catch (error) {
            console.log("error", error);
        }
    }
     // not complete
     const notCompleteItem = (id)=>{
        try{
            setItems(
            items.map((elem) => {
                if (elem.id == id) {
                    return { ...elem, isDel:false }
                }
                return elem;
            })
        )
    }
        catch (error) {
            console.log("error", error);
        }
    }
    //Delete the Items
    const deleteItems = (index) => {
        const updatedItems = items.filter((elem) => {
            return index != elem.id;
        });
        setItems(updatedItems);

    }
    // Edit the Items
    const editItems = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setUpdateEditItem(id);
    }
    // local storage items
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))

    }, [items]);

    // useEffect(() => {
    //       if(localStorage.setItem('lists')){
    //         setInputData(JSON.parse(localStorage.setItem(items)))
    //       }
    //     },[items])
    return (
        <>
            <section className="gradient-custom-2">
                <div className="container  h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8">
                            <div className="card mask-custom">
                                <div className="card-body p-4 text-white">
                                    <div className="text-center pt-2 pb-2">
                                        <img src={todo_pic} alt="Check" width={60} />
                                        <h2 className="my-4">Task List</h2>
                                    </div>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-lg-9'>
                                            <label htmlFor="exampleInputEmail1" className=" ml-3 form-label">Enter Your Task</label>
                                            <input type="text" className="form-control" placeholder='Enter Your Task' value={inputData} onChange={(e) => setInputData(e.target.value)} d="exampleInputEmail1" aria-describedby="emailHelp" required />

                                        </div>
                                        <div className='col-lg-3 mt-3 justify-content-start'>
                                            {
                                                toggleSubmit ? <span><button type="submit" className="btn btn-outline-light btn-bg text-white mt-3" onClick={addItems}>Submit&nbsp;<i class="fa-solid fa-plus"></i> </button></span> :
                                                    <button type="Edit submit" className="btn btn-outline-light btn-bg  text-white mt-3" onClick={addItems}> Edit Submit&nbsp;<i class="fa-solid fa-pen-to-square"></i></button>
                                            }
                                        </div>
                                    </div>
                                    <div className=' mt-3 overflow-try'>
                                        {
                                            items.map((elem) => {
                                                return (
                                                    <div className=' col-md-11 mt-1 d-flex justify-content-center mian-div' key={elem.id}>
                                                        <div className="list-group text-white list-bg">
                                                            <div className="list-group-item d-flex justify-content-between align-items-center align-content-center">
                                                                <div className='col-md-8'>
                                                                {/* <input>{elem.name}</input> */}
                                                                    <h6 className=" list-text mb-0">{elem.isDel ?<del>{elem.name}</del>:elem.name}</h6>
                                                                </div>
                                                                <div className="col-md-4 overlay ">
                                                                    <div className=' d-flex justify-content-around'>
                                                                    {
                                                                        !elem.isDel ? <button type="Check" className="btn   btn-bg  btn-outline-success " onClick={() => completeItem(elem.id)}><i class="fa-solid fa-check"></i></button>:
                                                                        <button type="Cancel" className="btn   btn-bg  btn-outline-danger " onClick={() => notCompleteItem(elem.id)} ><i class="fa-solid fa-xmark"></i></button>
                                                                    }
                                                                        <button type="Edit" className="btn   btn-bg  btn-outline-warning " disabled={elem.isDel} onClick={() => editItems(elem.id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                                                        <button type="delete" className=" mr-2 btn  btn-bg  btn-outline-danger" onClick={() => deleteItems(elem.id)}><i class="fa-solid fa-trash-can"></i></button>
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>

    )
}

export default Todo
import { useState,useRef } from "react";
import Data from './data'
import axios from "axios";


const TaskTracker = () => {


    let Task = useRef("");
    let SDate = useRef("")
    let EDate = useRef("")
    let prior = useRef("")
    

    let [value,setvalue] = useState(false)
    let [number,setNumber] = useState("")

    const CurrentDate = new Date().toISOString().slice(0,16);

    let handleSubmit = () => {
        
        let prirority = prior.current.value;
        let task = Task.current.value;
        let startDate = SDate.current.value;
        let endDate = EDate.current.value;
        
        let data = {task,startDate,endDate,prirority,addedon:new Date().toLocaleString()}

        console.log(data);
        
        
        if(task === "" || prirority === "" || startDate === '' || endDate === '' ){
            alert("please fill the Details")
        }else if(startDate === endDate){
            alert("Start Date Time and End Date Time are same")
        } else if(endDate < startDate ){
            alert("Invalid Date and Time entry")
        // } else if(task.includes(task)){
        //     alert("Same Task Name exists")
        }
        else{
            axios.post("http://localhost:4000/tasks",data)
            .then(res => {
                alert(res.data.message)
            })
            .catch(err => {
                alert(err.data.message)
            })
        }
    }

    

    let handleEdit = (_id) => {
        axios.get(`http://localhost:4000/tasks/${_id}`)
        .then((response) => response.data)
        .then((alldata) =>{
            Task.current.value = alldata.task
            prior.current.value = alldata.prirority
           SDate.current.value = alldata.startDate
           EDate.current.value = alldata.endDate
        } )
        setvalue(true)
        setNumber(_id)
    }


    let handleUpdate = (number) => {
        
        let updateTask = {
            task:Task.current.value,
            startDate:SDate.current.value,
            endDate:EDate.current.value,
            prirority:prior.current.value,
        }
        
        
        {    
            axios.put(`http://localhost:4000/tasks/${number}`,updateTask)
            .then((res) => {
                console.log("update")
            }).catch((err) => {
                console.log(err)
            })
            alert("Updated and saved")
        }
        setvalue(false)
    }


    return ( 
        <section className="">
            <h1 className="">Task Tracker</h1>
        <div className="task">
            <div className="data">
            <form action=""  >
            <section className="">
                            <div>
                                <label htmlFor="" > TaskName : </label>
                                <input 
                                type="text" 
                                ref={Task} 
                                
                                className=""
                                />
                                <label htmlFor="" >Prirority : </label>
                                <select className="dropdown"  ref={prior}  >
                                    <option value="0">High</option>
                                    <option value="1">Medium</option>
                                    <option value="2">Low</option>
                                </select>
                          </div>
                            <div>
                                <label htmlFor="" >Starting Date & Time : </label>
                                <input
                                type="datetime-local"
                                ref={SDate} 
                                min={CurrentDate}
                              
                                className=""
                                />
                            </div>
                            <div >
                                <label htmlFor=""  >Ending Date & Time : </label>
                                <input 
                                type="datetime-local" 
                                ref={EDate} 
                                min={CurrentDate}
                               
                                className=""
                                />
                            </div>
                                       
            </section>
                            <div className="">
                                {
                                    value === false ? <button  onClick={() => handleSubmit()} className=""  >Add Task</button> :
                                    <button onClick={() => handleUpdate(number)} className=" " >Update</button>
                                }
                            </div>
                </form>
        </div>
        </div>
            <Data  data={handleEdit}/>
        </section>
     );
}

export default TaskTracker;
import { useEffect, useState,useRef } from "react";
import axios from "axios";



const Data = (props) => {

    let handleEdit = props.data

    const [task, setTask] = useState([]);
    const [search, setsearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState(10);

  

    var date = new Date()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:4000/tasks-post");
            const data = await res.data; 
            let d = [...data];
            d = d.map((task)=>{ 
                let result = ""
                if(new Date(task.startDate) >  date){
                    result = "Not yet"
                }else if(new Date(task.startDate) < new Date(task.endDate) &&  new Date(task.endDate) > date){
                    result =" in progress";
                }else{
                    result = "Completed"
                }

            return {...task , status :  result }});
            setTask(d);
        };
        fetchData();
    }, [task]);


    let priorities = {
        0 : "High",
        1 : "Medium",
        2 : "low"
    }
    


    const handleDelete = (_id,task,startDate, endDate, prirority,status,addedon) => {
        console.log(task,startDate, endDate, prirority,status,addedon);
        if(window.confirm("Do you really want to delete it")){
            axios.delete(`http://localhost:4000/tasks/${_id}`);
        }
    }




    
    const indexOfLastTask = currentPage * totalPage;
    const indexOfFirstTask = indexOfLastTask - totalPage;
        
    // const recordsToDisplay = records.slice(0, totalPage);

    const handleCountChange = (event) => {
        settotalPage(event.target.value);
      };


    const currentTasks = task
        .filter((item) => item.task.toLowerCase().includes(search))
        
        .slice(indexOfFirstTask, indexOfLastTask);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(task.length / totalPage); i++) {
        pageNumbers.push(i);
    }


    const NextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const PrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div className="details">
            <section>
                {/* <div className="">
                    <label htmlFor="">Number of records : </label>
                    <input type="number" value={totalPage} onChange={handleCountChange} min="1" />
                </div> */}
                <div  className="container">
                   

                    <label htmlFor="">Search : </label>
                    <input type="text" placeholder="search here"  className="" value={search} onChange={(e) => setsearch(e.target.value)} />
                    
                </div>
            </section>
            <section className="tab">
                <table className="designtab" width="67%" border="4px" align="center">
                    <thead className="" >
                        <tr>
                            <th>Sl No</th>
                            <th>Task Name</th>
                            <th>Start Date & Time</th>
                            <th>End Date & Time</th>
                            <th>Prirority</th>
                            <th>Status</th>
                            <th>Added ON</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.map(({ task, startDate, endDate, prirority, _id ,status,addedon}, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{task}</td>
                                <td>{new Date(startDate).toLocaleString()}</td>
                                <td>{new Date(endDate).toLocaleString()}</td>
                                <td>{priorities[prirority]}</td>
                                <td>{status}</td>
                                <td>{addedon}</td>
                                <td>
                                        
                                        { (status !== "Completed" || status === "Not yet" ||status === "in progress" )  &&   <button onClick={() => handleEdit(_id)} className=""><img src="https://cdn-icons-png.flaticon.com/512/84/84380.png" height="20px"  alt="" /></button>}
                                        {(status !== "Completed" && status === "Not yet") &&<button onClick={() => handleDelete(_id,task,startDate, endDate, prirority,status,addedon) } className="" ><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="20px" alt="" srcset="" /></button>}
                                        
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="content">
                <button className="" onClick={() => PrevPage()}>Prev</button>
                <button  className=""  onClick={() => NextPage()}>Next</button>
            </div>
        </div>
     );
}
 
export default Data;
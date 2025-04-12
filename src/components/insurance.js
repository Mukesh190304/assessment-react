import React,{useState,useEffect} from "react";
import axios from "axios";
import "./insurance.css";

function Insurance(){
    const API_URL="http://localhost:5000/insurance";
    const [insurancelist,setInsurancelist]=useState([]);
    const [insurance,setInsurance]=useState({
        id:"",
        name:"",
        type:"",
        amount:"",
        expirydate:""

    })
    const[isEditing,setIsEditing]=useState(false);
    const[editid,setEditid]=useState(null);

    useEffect(()=>{
        axios.get(API_URL).then((res)=>{
            setInsurancelist(res.data);
        })
    },[]);
    const handlesubmit= async(e)=>{
        e.preventDefault();
        if(!insurance.id||!insurance.name||!insurance.type||!insurance.amount||!insurance.expirydate){
            alert("Please fill all the fields");
            return;
        }
        if(isEditing){
            await axios.put(`${API_URL}/${editid}`,insurance);
            setIsEditing(false);
            setEditid(null);
            }
            else{
                await axios.post(API_URL,insurance);
            }
            const updated=await axios.post(API_URL,insurance);
            setInsurancelist(updated.data);
            setInsurance({
                id:"",
                name:"",
                type:"",
                amount:"",
                expirydate:""
            })

            
    };

    const handleDelete=async(id)=>{
        await axios.delete(`${API_URL}/${id}`);
        const updated=await axios.get(API_URL);
        setInsurancelist(updated.data);
    }

    const handleEdit=(data)=>{
        setInsurance(data)
        setIsEditing(true);
        setEditid(data.id);
    };

    return(
        <div className="insurance-container">
            <div className="container">
        <h1 style={{color:"blue", textDecoration:"underline"} }>Insurance Management system</h1>
        <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label>Policy ID:</label>
                </div>
                <div className="form-group">
                    <input type="text" value={insurance.id} onChange={(e)=>setInsurance({...insurance,id:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Person Name:</label>
                </div>
                <div className="form-group">
                    <input type="text" value={insurance.name} onChange={(e)=>setInsurance({...insurance,name:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Policy Type:</label>
                </div>
                <div className="form-group">
                    <input type="text" value={insurance.type} onChange={(e)=>setInsurance({...insurance,type:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Premium Amount:</label>
                </div>
                <div className="form-group">
                    <input type="text" value={insurance.amount} onChange={(e)=>setInsurance({...insurance,amount:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Expiry Date:</label>
                </div>
                <div className="form-group">
                    <input type="text" value={insurance.expirydate} onChange={(e)=>setInsurance({...insurance,expirydate:e.target.value})}/>
                </div>  
                <div className="form-group">
                    <button type="submit" id="submit">{isEditing?"Update":"Add"}</button>
                </div>
        </form>
        </div>

        <div>
            <h2>INSURANCE INFORMATION</h2>
            <table>
                <thead>
                    <tr>
                        <th>Policy ID</th>
                        <th> Person Name</th>
                        <th> Policy Type</th>
                        <th>Premium Amount</th>
                        <th>Expiry Date</th>
                        <th>Actions</th>
                      
                        </tr>
                        </thead>
                        <tbody>
                            {insurancelist.map((insurancelist)=>(
                                <tr key={insurancelist.id}>
                                    <td>{insurancelist.id}</td>
                                    <td>{insurancelist.name}</td>
                                    <td>{insurancelist.type}</td>
                                    <td>{insurancelist.amount}</td>
                                    <td>{insurancelist.expirydate}</td>
                                    <td>
                                        <button  id ="delete" onClick={()=>handleDelete(insurancelist.id)}>Delete</button>
                                        <button  id ="edit" onClick={()=>handleEdit(insurancelist)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                        
                       
                       



                    
               
            </table>
        </div>
        </div>
    )

}

export default Insurance;
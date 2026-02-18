import React, { useState } from "react";


export default function PcBuilder(){

    
    const[cpu,setCPU] = useState("")
    const[selectedCPUid,setSelectedCPUid]=useState("")
    const[motherBoard,setMotherBoard] = useState("")
    const[heatSink,setHeatSink] = useState("")
    const[ram,setRam] = useState("")
    const[storage1,setStorage1] = useState("")
    const[storage2,setStorage2] = useState("")
    const[gpu,setGpu] = useState("")
    const[psu,setPsu] = useState("")
    const[chasis,setChasis] = useState("")

    //Database temp
    
    const data_Proc=[{id:1,name:"Intel Core i5",socket:"LGA1700"},
                    {id:2,name:"Intel Core i7",socket:"LGA1700"},
                    {id:3,name:"Intel Core i3",socket:"LGA1200"},
                    {id:4,name:"Ryzen 5",socket:"AM4"},
                    {id:5,name:"Ryzen 7",socket:"AM4"},
                    {id:6,name:"Ryzen 3",socket:"AM3"}
                    ]

    const handleCPUchange=(e)=>{
        const cpuID= e.target.value;
        setSelectedCPUid(cpuID)}

    return (<div className="custom-desktop-container">
            <select value={selectedCPUid} onChange={handleCPUchange}>
            <option value="">--Select--</option>
            {data_Proc.map((item)=>{
                return <option key={item.id} value={item.id}>{item.name}</option>})
                }
            </select>
    </div>
 )
}
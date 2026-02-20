import React, { useState } from "react";


export default function PcBuilder(){

    
    // const[cpu,setCPU] = useState("") to be used when fetching from API
    const[selectedCPUid,setSelectedCPUid]=useState("")
    const[selectedSocket,setSelectedSocket] = useState("")
    const[motherBoard,setMotherBoard] = useState([])
    const[heatSink,setHeatSink] = useState("")
    const[ram,setRam] = useState("")
    const[storage1,setStorage1] = useState("")
    const[storage2,setStorage2] = useState("")
    const[gpu,setGpu] = useState("")
    const[psu,setPsu] = useState("")
    const[chasis,setChasis] = useState("")

    const[filteredData,setFilteredData] = useState("")

    //Database temp hardcoded
    
    const cpu=[{id:1,name:"Intel Core i5",socket:"LGA1700"},
                    {id:2,name:"Intel Core i7",socket:"LGA1700"},
                    {id:3,name:"Intel Core i3",socket:"LGA1200"},
                    {id:4,name:"Ryzen 5",socket:"AM4"},
                    {id:5,name:"Ryzen 7",socket:"AM4"},
                    {id:6,name:"Ryzen 3",socket:"AM3"}
                    ]
    const mobo=[{id:1, name:"H110", socket:"LGA1700"},
                {id:2, name:"B210", socket:"LGA1700"},
                {id:3, name:"Z710", socket:"LGA1700"},
                {id:4, name:"MSI Z", socket:"AM4"},
                {id:5, name:"ASUS B", socket:"AM3"},


    ]
    
  // TODO: done matching socket to motherboard selection, next is ADD a cost of items then calculate total.

    const handleCPUchange=(e)=>{
        const selectedId= e.target.value;
        const selectedCPU= cpu.find((c)=>{return c.id===Number(selectedId)})
        const filterMobo= mobo.filter(s=>s.socket===String(selectedCPU.socket))

        setMotherBoard(filterMobo);
        setSelectedCPUid(selectedCPU.id);
        setSelectedSocket(selectedCPU.socket);
        }
    
        console.log("Filtered Mobo",motherBoard)
        console.log("cpuId",selectedCPUid)
        console.log("socket", selectedSocket)

    return (<div className="custom-desktop-container">
            <select value={selectedCPUid} onChange={handleCPUchange}>
            <option value="">--Select--</option>
            {cpu.map((item)=>{
                return <option key={item.id} value={item.id}>{item.name}</option>})
                }
            </select>
            <select value={motherBoard.name} onChange={handleCPUchange}>
            <option value="">--Select--</option>
            {motherBoard.map((item)=>{
                return <option key={item.id} value={item.id}>{item.name}</option>})
                }
            </select>
    </div>
 )
}
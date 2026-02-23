import React, { useState } from "react";

   //Database temp hardcoded
    
    const cpu=[{id:1,name:"Intel Core i5",socket:"LGA1700",price:"675.50"},
                    {id:2,name:"Intel Core i7",socket:"LGA1700",price:"1500.50"},
                    {id:3,name:"Intel Core i3",socket:"LGA1200",price:"450.00"},
                    {id:4,name:"Ryzen 5",socket:"AM4",price:"725.00"},
                    {id:5,name:"Ryzen 7",socket:"AM4",price:"1400.00"},
                    {id:6,name:"Ryzen 3",socket:"AM3",price:"400.00"}
                    ]
    const mobo=[{id:1, name:"H110", socket:"LGA1700"},
                {id:2, name:"B210", socket:"LGA1700"},
                {id:3, name:"Z710", socket:"LGA1700"},
                {id:4, name:"HM80", socket:"LGA1200"},
                {id:5, name:"MSI Z", socket:"AM4"},
                {id:6, name:"ASUS B", socket:"AM3"},


    ]

export default function PcBuilder(){

    
    // const[cpu,setCPU] = useState("") to be used when fetching from API
   
    const[selectedCPU,setSelectedCPU]=useState([])
    const[selectedSocket,setSelectedSocket] = useState([])
    const[motherBoard,setMotherBoard] = useState([])
    const[heatSink,setHeatSink] = useState([])
    const[ram,setRam] = useState("")
    const[storage1,setStorage1] = useState("")
    const[storage2,setStorage2] = useState("")
    const[gpu,setGpu] = useState("")
    const[psu,setPsu] = useState("")
    const[chasis,setChasis] = useState("")


    
  // TODO: BROKEN matching socket to motherboard selection, after adding price field

    const handleCPUchange=(e)=>{
        const selectedId= e.target.value;
        const getCPU= cpu.find((c)=>{return c.id===Number(selectedId)})
        const filterMobo= mobo.filter(s=>s.socket===String(getCPU.socket))

        setMotherBoard(filterMobo);
        setSelectedCPU(getCPU);
        setSelectedSocket(getCPU.socket);
        }
    
    const handleMobochange=(e)=>{
        const filterMobo= mobo.filter(s=>s.socket===String(getCPU.socket))

        setMotherBoard(filterMobo);
        }
    
        console.log("Filtered Mobo",motherBoard)
        console.log("cpu",selectedCPU)
        console.log("socket", selectedSocket)


        // crashes if --select-- is selected
    return (<div className="custom-desktop-container">
            <select value={selectedCPU.id} onChange={handleCPUchange}>
            <option value="">--Select--</option>
            {cpu.map((item)=>{
                return <option key={item.id} value={item.id}>{item.name}</option>})
                }
            </select>
             <div className="price">
                <span>AED </span>&nbsp; {selectedCPU.price}
            </div>

            <select value={motherBoard.name} onChange={handleMobochange}>
            <option value="">--Select--</option>
            {motherBoard.map((item)=>{
                return <option key={item.id} value={item.id}>{item.name}</option>})
                }
            </select>
    </div>
 )
}
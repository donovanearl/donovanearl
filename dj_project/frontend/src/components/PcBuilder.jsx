import React, { useState,useEffect } from "react";
import PartSelector from "./PartSelector";
import "../styles/Customized_Desktop.css"

   //Database temp hardcoded
    
    const cpu=[{id:1,name:"Intel Core i5",socket:"LGA1700",price:"675.50"},
                    {id:2,name:"Intel Core i7",socket:"LGA1700",price:"1500.50"},
                    {id:3,name:"Intel Core i3",socket:"LGA1200",price:"450.00"},
                    {id:4,name:"Ryzen 5",socket:"AM4",price:"725.00"},
                    {id:5,name:"Ryzen 7",socket:"AM4",price:"1400.00"},
                    {id:6,name:"Ryzen 3",socket:"AM3",price:"400.00"}
                    ]
    const mobo=[{id:1, name:"H110", socket:"LGA1700", price:"350.00"},
                {id:2, name:"B210", socket:"LGA1700", price:"400.00"},
                {id:3, name:"Z710", socket:"LGA1700", price:"750.00"},
                {id:4, name:"HM80", socket:"LGA1200", price:"350.00"},
                {id:5, name:"MSI Z", socket:"AM4", price:"850.00"},
                {id:6, name:"ASUS B", socket:"AM3", price:"550.00"},
                ]   
    
    const CPU_coolerData=[{id:1, name:"Aircooler100", socket:"LGA1700", price:"150.00"},
                        {id:2, name:"Aircooler200", socket:"LGA1200", price:"250.00"},
                        {id:3, name:"AircoolA4", socket:"AM4", price:"150.00"},
                        {id:4, name:"AircoolA4", socket:"AM3", price:"100.00"},
    ]
    const RAMData=[{id:1, name:"Crucial 16GB DDR5", socket:"LGA1700", price:"1250.00"},
                    {id:2, name:"Crucial 32GB DDR5", socket:"LGA1200", price:"2250.00"},
        
    ]
    const GPUData=[{id:1, name:"RTX3060", price:"1250.00"},
                    {id:2, name:"RTX5070", price:"2250.00"},
        
    ]
    const StorageData=[{id:1, name:"Crucial 1TB NVMe", price:"600.00"},
                    {id:2, name:"Samsung 1TB SSD", price:"200.00"},
        
    ]
    const PSUData=[{id:1, name:"Silverstone 650w", price:"800.00"},
                    {id:2, name:"Corsair 650vs", price:"250.00"},
        
    ]
    const ChasisData=[{id:1, name:"CoolerMaster 100p", price:"300.00"},
                    {id:2, name:"NZXT tower x1", price:"350.00"},
        
    ]
 

export default function PcBuilder(){

    const [selectedpart,setSelectedpart]= useState({
        selectedCPU:null,
        selectedmotherboard:null,
        selectedCPU_cooler:null,
        selectedRAM:null,
        selectedGPU:null,
        selectedstorage1:null,
        selectedstorage2:null,
        selectedPSU:null,
        selectedChasis:null,
    })
   
    
    const[motherboard,setMotherboard] = useState([])
    
    const[CPU_cooler,setCPU_cooler] = useState([])
    
    // const[RAM,setRAM] = useState([])       ****** old method for reference****** Start

    // const[GPU,setGPU] = useState([])

    // const[storage1,setStorage1] = useState([])

    // const[storage2,setStorage2] = useState([])

    // const[psu,setPSU] = useState([])

    // const[chasis,setChasis] = useState([])

//     //Temp fill RAM with RAMdata
// useEffect(()=>{
//     setRAM(RAMData);
//     setGPU(GPUData);
//     setStorage1(StorageData);
//     setStorage2(StorageData);
//     setPSU(PSUData);
//     setChasis(ChasisData);
//     }
// ,[])                                       ****** old method for reference****** End

   const Total= Object.values(selectedpart)
   .filter(Boolean)
   .reduce((sum,part)=>{
    return sum+parseFloat(part.price)},0).toFixed(2)
    
 
    // event handler that choose Proc and filters Mobo and Cooler selections
    const handleCPUchange=(e)=>{
        const selectedId= e.target.value;
        const getCPU= cpu.find((c)=>{return c.id===Number(selectedId)})
      
        if(!getCPU){
            setMotherboard([]);
            setCPU_cooler([]);
            setSelectedpart({
                selectedCPU:null,
                selectedRAM:selectedpart.selectedRAM,
                selectedGPU:selectedpart.selectedGPU,
                selectedstorage1:selectedpart.selectedstorage1,
                selectedstorage2:selectedpart.selectedstorage2,
                selectedPSU:selectedpart.selectedPSU,
                selectedChasis:selectedpart.selectedChasis,
            })
           
            return;
        }

        // Filter and set Mobo and heatsink cooler
        const filterMobo= mobo.filter(s=>s.socket===String(getCPU.socket))
        const filterCPU_coolerData= CPU_coolerData.filter(s=>s.socket===getCPU.socket) 

        setMotherboard(filterMobo);
        setCPU_cooler(filterCPU_coolerData);
        

        setSelectedpart({
            selectedCPU:getCPU,
            selectedmotherboard:null,   // reset coz CPU changed
            selectedCPU_cooler:null,    // reset
            selectedRAM:selectedpart.selectedRAM,
            selectedGPU:selectedpart.selectedGPU,
            selectedstorage1:selectedpart.selectedstorage1,
            selectedstorage2:selectedpart.selectedstorage2,
            selectedPSU:selectedpart.selectedPSU,
            selectedChasis:selectedpart.selectedChasis,
        })
    }
    
    const handleMobochange=(e)=>{
        const selectedId= e.target.value;
        const getmotherboard= motherboard.find(m=>m.id===Number(selectedId));

        setSelectedpart({selectedmotherboard:getmotherboard,
            selectedCPU:selectedpart.selectedCPU,
            selectedCPU_cooler:selectedpart.selectedCPU_cooler,   // reset
            selectedRAM:selectedpart.selectedRAM,
            selectedGPU:selectedpart.selectedGPU,
            selectedstorage1:selectedpart.selectedstorage1,
            selectedstorage2:selectedpart.selectedstorage2,
            selectedPSU:selectedpart.selectedPSU,
            selectedChasis:selectedpart.selectedChasis,

        })
        }
    const handleCPU_coolerchange=(e)=>{
        const selectedId= e.target.value;
        const getCPU_cooler= CPU_cooler.find(m=>m.id===Number(selectedId));

          setSelectedpart({
            selectedmotherboard:selectedpart.selectedmotherboard,
            selectedCPU:selectedpart.selectedCPU,
            selectedCPU_cooler:getCPU_cooler,
            selectedRAM:selectedpart.selectedRAM,
            selectedGPU:selectedpart.selectedGPU,
            selectedstorage1:selectedpart.selectedstorage1,
            selectedstorage2:selectedpart.selectedstorage2,
            selectedPSU:selectedpart.selectedPSU,
            selectedChasis:selectedpart.selectedChasis,})
        }
    
        //Generic handler
    const handlechange_Other=(key,dataset)=>(e)=>{
        const selectedID=e.target.value;
        const found=dataset.find(item=>item.id===Number(selectedID));
        
        setSelectedpart({
            selectedCPU:selectedpart.selectedCPU,
            selectedmotherboard:selectedpart.selectedmotherboard,
            selectedCPU_cooler:selectedpart.selectedCPU_cooler,
            selectedRAM:key==="selectedRAM"?found||null:selectedpart.selectedRAM,
            selectedGPU:key==="selectedGPU"?found||null:selectedpart.selectedGPU,
            selectedstorage1:key==="selectedstorage1"?found||null:selectedpart.selectedstorage1,
            selectedstorage2:key==="selectedstorage2"?found||null:selectedpart.selectedstorage2,
            selectedPSU:key==="selectedPSU"?found||null:selectedpart.selectedPSU,
            selectedChasis:key==="selectedChasis"?found||null:selectedpart.selectedChasis,

        })
    }
    


        // selectedmotherboard?.id||""  <---- prevents crash when clicking --select--
    return (<div className="custom-desktop-container">
            <PartSelector value={selectedpart.selectedCPU?.id||""} options={cpu} onChange={handleCPUchange} label="Processor" />   
            <PartSelector value={selectedpart.selectedmotherboard?.id||""} options={motherboard} onChange={handleMobochange} label="Motherboard" />
            <PartSelector value={selectedpart.selectedCPU_cooler?.id||""} options={CPU_cooler} onChange={handleCPU_coolerchange} label="CPU cooler"/>
            <PartSelector value={selectedpart.selectedRAM?.id||""} options={RAMData} onChange={handlechange_Other("selectedRAM",RAMData)} label="RAM"/> 
            <PartSelector value={selectedpart.selectedGPU?.id||""} options={GPUData} onChange={handlechange_Other("selectedGPU",GPUData)} label="GPU"/>
            <PartSelector value={selectedpart.selectedstorage1?.id||""} options={StorageData} onChange={handlechange_Other("selectedstorage1",StorageData)} label="storage1"/> 
            <PartSelector value={selectedpart.selectedstorage2?.id||""} options={StorageData} onChange={handlechange_Other("selectedstorage2",StorageData)} label="storage2"/>
            <PartSelector value={selectedpart.selectedPSU?.id||""} options={PSUData} onChange={handlechange_Other("selectedPSU",PSUData)} label="PSU"/> 
            <PartSelector value={selectedpart.selectedChasis?.id||""} options={ChasisData} onChange={handlechange_Other("selectedChasis",ChasisData)} label="Chasis"/> 
            <div className="totals">Total:  {Total} AED </div>
    </div>
 )
}
// TODO: ADD a reduce method to sum all prices to get Total
// TODO: Create Models schema and Django APIVIEW , serialize it and create API endpoints for Axios to fetch and use it in PCbuilder page
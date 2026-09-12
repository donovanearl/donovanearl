import React, { useState,useEffect } from "react";
import PartSelector from "./PartSelector";
import "../styles/Customized_Desktop.css"
import axios from "axios"
import { getBaseURL } from "../api";



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
        selectedChassis:null,
    })
    const[allData,setAllData]= useState([])
    const[CPU,setCPU]= useState([])
    const[motherboard,setMotherboard] = useState([]) 
    const[CPU_cooler,setCPU_cooler] = useState([])
    const[RAM,setRAM]= useState([])
    const[GPU,setGPU]= useState([])
    const[storage,setStorage]= useState([])
    const[PSU,setPSU]= useState([])
    const[chassis,setChassis]= useState([])

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res=await axios.get(`${getBaseURL()}/api/products/customized-desktop/partselector/`)
                const data=res.data

                setAllData(data);
                setCPU(data.filter((item) => item.type === "Processor"));
                setMotherboard(data.filter((item) => item.type === "Motherboard"));
                setCPU_cooler(data.filter((item) => item.type === "CPU_cooler"));
                setRAM(data.filter((item) => item.type === "RAM"));
                setGPU(data.filter((item) => item.type === "GPU"));
                setStorage(data.filter((item) => item.type === "Storage"));
                setPSU(data.filter((item) => item.type === "PSU"));
                setChassis(data.filter((item) => item.type === "Chassis"));
                }
            catch(error){
                console.log("error loading data",error)
                         }
            };
            fetchData();
            }
            ,[])
    
    
    

   const Total= Object.values(selectedpart)
   .filter(Boolean)
   .reduce((sum,part)=>{
    return sum+parseFloat(part.price)},0).toFixed(2)
    
 
    // event handler that choose Proc and filters Mobo and Cooler selections
    const handleCPUchange=(e)=>{
        const selectedId= e.target.value;
        const getCPU= CPU.find((c)=>{return c.id===Number(selectedId)})
      
            if(!getCPU){
                setMotherboard(allData.filter((item)=>item.type === "Motherboard"));
                
                setSelectedpart(prev=>({...prev,selectedmotherboard:null, selectedCPU:null})
                )
            
                return;
            }


            setMotherboard(allData.filter((item)=>item.socket===String(getCPU.socket)&&item.type ==="Motherboard"));
            setCPU_cooler(allData.filter((item)=>item.type ==="CPU_cooler")); //no socket filter
            

            setSelectedpart(prev=>({...prev,selectedCPU:getCPU,selectedmotherboard:null,selectedCPU_cooler:null}))
    }
    
    const handleMobochange=(e)=>{
        const selectedId= e.target.value;
        const getmotherboard= motherboard.find(m=>m.id===Number(selectedId));

        setSelectedpart(prev=>({...prev,selectedmotherboard:getmotherboard}))
        }
        
    const handleCPU_coolerchange=(e)=>{
        const selectedId= e.target.value;
        const getCPU_cooler= CPU_cooler.find(m=>m.id===Number(selectedId));

          setSelectedpart(prev=>({...prev,selectedCPU_cooler:getCPU_cooler}))
        }
    
        //Generic handler
    const handlechange_Other=(key,dataset)=>(e)=>{
        const selectedID=e.target.value;
        const found=dataset.find(item=>item.id===Number(selectedID));
        
        setSelectedpart(prev=>({...prev,[key]:found||null,

            // selectedCPU:selectedpart.selectedCPU,
            // selectedmotherboard:selectedpart.selectedmotherboard,
            // selectedCPU_cooler:selectedpart.selectedCPU_cooler,
            // selectedRAM:key==="selectedRAM"?found||null:selectedpart.selectedRAM,
            // selectedGPU:key==="selectedGPU"?found||null:selectedpart.selectedGPU,
            // selectedstorage1:key==="selectedstorage1"?found||null:selectedpart.selectedstorage1,
            // selectedstorage2:key==="selectedstorage2"?found||null:selectedpart.selectedstorage2,
            // selectedPSU:key==="selectedPSU"?found||null:selectedpart.selectedPSU,
            // selectedChassis:key==="selectedChasis"?found||null:selectedpart.selectedChassis,

        }))
    }
    


        // selectedmotherboard?.id||""  <---- prevents crash when clicking --select--
    return (<div className="custom-desktop-container">
            <PartSelector value={selectedpart.selectedCPU?.id||""} options={CPU} onChange={handleCPUchange} label="Processor" />   
            <PartSelector value={selectedpart.selectedmotherboard?.id||""} options={motherboard} onChange={handleMobochange} label="Motherboard" />
            <PartSelector value={selectedpart.selectedCPU_cooler?.id||""} options={CPU_cooler} onChange={handleCPU_coolerchange} label="CPU cooler"/>
            <PartSelector value={selectedpart.selectedRAM?.id||""} options={RAM} onChange={handlechange_Other("selectedRAM",RAM)} label="RAM"/> 
            <PartSelector value={selectedpart.selectedGPU?.id||""} options={GPU} onChange={handlechange_Other("selectedGPU",GPU)} label="GPU"/>
            <PartSelector value={selectedpart.selectedstorage1?.id||""} options={storage} onChange={handlechange_Other("selectedstorage1",storage)} label="storage1"/> 
            <PartSelector value={selectedpart.selectedstorage2?.id||""} options={storage} onChange={handlechange_Other("selectedstorage2",storage)} label="storage2"/>
            <PartSelector value={selectedpart.selectedPSU?.id||""} options={PSU} onChange={handlechange_Other("selectedPSU",PSU)} label="PSU"/> 
            <PartSelector value={selectedpart.selectedChassis?.id||""} options={chassis} onChange={handlechange_Other("selectedChassis",chassis)} label="Chasis"/> 
            <div className="totals">Total:  {Total} AED </div>
    </div>
 )
}

//TO DO :  Refactor handleChange_Other using prev
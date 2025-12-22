import { format } from 'date-fns';
import { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosReturnLeft } from "react-icons/io";

import Calendar from "../components/Calendar"
import Planner from "../components/Planner"
import { defaultTodos } from "../constants/index";
import { fetchPlanned, updatePlanned, fetchReality, updateReality } from "../services/plannerService";

const PlannerPage= ()=>{  

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [planned, setPlanned] = useState([]);
    const [reality, setReality] = useState([]);
    const [canEdit, setCanEdit]= useState(false)
    const [undo, setUndo]= useState(false)

    useEffect(() => {
        const loadPlanned= async()=>{
            try{
                const data= await fetchPlanned(format(selectedDate, 'yyyy-MM-dd'))
                setPlanned(data.length > 0 ? data : defaultTodos)
            } catch (err) {
                console.error(err);
                setPlanned(defaultTodos)
            }
        }

        loadPlanned();
    }, [selectedDate]);    


    useEffect(() => {
        const loadReality= async()=>{
            try{
                const data= await fetchReality(format(selectedDate, 'yyyy-MM-dd'))
                setReality(data.length > 0 ? data : defaultTodos)
            } catch (err) {
                console.error(err);
                setReality(defaultTodos)
            }
        }

        loadReality();
    }, [selectedDate]);    

    const handleSave= async() => {
        try{
            const plannedPayLoad= planned.map((slot)=> ({
                planner_date: format(selectedDate, 'yyyy-MM-dd'), 
                planned_time: slot.time,
                task: slot.task
            }));

            const realityPayLoad= reality.map((slot)=> ({
                planner_date: format(selectedDate, 'yyyy-MM-dd'), 
                planned_time: slot.time,
                task: slot.task
            }));

            await updatePlanned(plannedPayLoad);
            await updateReality(realityPayLoad)
            setCanEdit(false);
        } catch (err){
            console.error("Save failed:", err)
        }
    };

    const handleUndo = () => {
        setUndo(true);
        setCanEdit(false);

        // reset undo so it can be triggered again
        setTimeout(() => setUndo(false), 0);
    };

    return(
        <>  
            <div className="relative flex-center flex-col gap-5">
                
                <div className="relative w-full flex-center">
                    <Calendar
                        selectedDate= {selectedDate}
                        onChange= {setSelectedDate}
                    />
                    {canEdit ?
                    <IoIosReturnLeft 
                        onClick={handleUndo} 
                        className="absolute left-1/2 translate-x-[180px] cursor-pointer"
                    />
                    
                    :<BsPencilSquare 
                        onClick={()=>{setCanEdit(true)}} 
                        className="absolute left-1/2 translate-x-[180px] cursor-pointer"
                    />
                    }
                </div>         
                
                <div className="flex flex-row gap-40">
                    <Planner 
                        selectedDate= {selectedDate}
                        todos= {planned}
                        canEdit={canEdit}
                        onChange={setPlanned}
                        undo= {undo}    
                    />
                    <Planner 
                        selectedDate= {selectedDate}
                        todos= {reality}
                        canEdit={canEdit}
                        onChange={setReality}
                        undo= {undo}   
                    />
                </div>

                {canEdit && 
                    <button 
                        onClick={handleSave} 
                        className="w-full rounded-md py-1 text-white bg-[#C67C4e] hover:bg-[#F9F2ED] hover:text-[#313131]"
                    >
                        Save
                    </button>
                }                

            </div>
        </>
    )
}

export default PlannerPage
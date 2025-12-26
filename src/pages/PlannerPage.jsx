import { format } from 'date-fns';
import { useState, useEffect, useReducer } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosReturnLeft } from "react-icons/io";

import Calendar from "../components/Calendar"
import Planner from "../components/Planner"
import { defaultTodos } from "../constants/index";
import { plannerReducer } from "../reducers/plannerReducer";
import { fetchPlanned, updatePlanned, fetchReality, updateReality } from "../services/plannerService";

const PlannerPage= ()=>{  

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [canEdit, setCanEdit]= useState(false)

    const [plannedState, dispatchPlanned] = useReducer(plannerReducer, {
        current: [],
        history: []
    });
    
    const [realityState, dispatchReality] = useReducer(plannerReducer, {
        current: [],
        history: []
    });    

    useEffect(() => {
        const loadData = async () => {
            try {
                const dateStr = format(selectedDate, 'yyyy-MM-dd');
                const [plannedData, realityData] = await Promise.all([
                    fetchPlanned(dateStr),
                    fetchReality(dateStr)
                ]);
                dispatchPlanned({ 
                    type: 'SET_TODOS', 
                    payload: plannedData.length > 0 ? plannedData : defaultTodos 
                });
                dispatchReality({ 
                    type: 'SET_TODOS', 
                    payload: realityData.length > 0 ? realityData : defaultTodos 
                });
            } catch (err) {
                console.error(err);
                dispatchPlanned({ type: 'SET_TODOS', payload: defaultTodos });
                dispatchReality({ type: 'SET_TODOS', payload: defaultTodos });
            }
        };
        loadData();
    }, [selectedDate]); 

    const handleEdit = () => {
        dispatchPlanned({ type: 'START_EDIT' });
        dispatchReality({ type: 'START_EDIT' });
        setCanEdit(true);
    };

    const handleUndo = () => {
        dispatchPlanned({ type: 'UNDO' });
        dispatchReality({ type: 'UNDO' });
        setCanEdit(false);
    };     

    const handleSave= async() => {
        try{
            const plannedPayLoad= plannedState.current.map((slot)=> ({
                planner_date: format(selectedDate, 'yyyy-MM-dd'), 
                planned_time: slot.time,
                task: slot.task
            }));

            const realityPayLoad= realityState.current.map((slot)=> ({
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

    const handlePlannedChange = (newTodos) => {
        dispatchPlanned({ type: 'SET_TODOS', payload: newTodos });
    };

    const handleRealityChange = (newTodos) => {
        dispatchReality({ type: 'SET_TODOS', payload: newTodos });
    };    

    return(
        <>  
            <div className="relative flex-center flex-col gap-5">
                
                <div className="relative w-full flex-center flex-row">

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
                        onClick={handleEdit} 
                        className="absolute left-1/2 translate-x-[180px] cursor-pointer"
                    />
                    }
                </div>         
                
                <div className="flex flex-row gap-40">
                    <Planner 
                        position="left"
                        type="planned"
                        selectedDate= {selectedDate}
                        todos= {plannedState.current}
                        canEdit={canEdit}
                        onChange={handlePlannedChange}    
                    />
                    <Planner 
                        position="right"
                        type="reality"
                        selectedDate= {selectedDate}
                        todos={realityState.current}
                        canEdit={canEdit}
                        onChange={handleRealityChange}                         
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
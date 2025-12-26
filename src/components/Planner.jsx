import { useEffect, useState, useRef } from "react"
import { format, addMinutes, startOfDay, setHours, addDays } from "date-fns";
import { usePlannerContext } from "../contexts/PlannerContext";
import StartEnd from "./StartEnd";

const Planner= ({ position, type, todos, canEdit, onChange })=>{
    const containerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const { planned, reality } = usePlannerContext();
    const config = (type==="planned") ? planned : reality

    useEffect(() => {
        const newTodos = [];
        
        // Parse the time strings to get hours
        const startHour = parseInt(config.start.split(':')[0]);
        const endHour = parseInt(config.end.split(':')[0]);
        
        let newStart = setHours(startOfDay(new Date()), startHour);
        let newEnd = setHours(startOfDay(new Date()), endHour);

        if (newEnd <= newStart) {
            newEnd = addDays(newEnd, 1);  // Add 1 day to end time
        }        

        while (newStart <= newEnd) {
            const newTime = format(newStart, "HH:mm:ss");
            const existingSlot = todos.find(slot => slot.time === newTime);
            
            newTodos.push({
                time: newTime, 
                task: existingSlot ? existingSlot.task : ""
            });
            
            newStart = addMinutes(newStart, parseInt(config.interval));
        }
        
        onChange(newTodos);

    }, [config.start, config.end, config.interval]);

    const formatTime = (timeString) => {
        if (!timeString) return '--:--';
        return timeString.slice(0, 5);
    };    

    const handleTaskChange = (index, value) => {
        const updatedTodos = todos.map((slot, i) =>
            i === index ? { ...slot, task: value } : slot
        );
        onChange(updatedTodos); 
    };

    useEffect(()=>{
        const handleClickOutside= (e)=>{
            if (containerRef.current && !containerRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }

        if (isOpen){
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen])    

    return(
        <>
            <div className="flex-center flex-col">
                <table className="w-[80%]">
                    <thead>
                        <tr>
                            <th colSpan={2}>Schedule
                                <span 
                                    className="badge"
                                    onClick={()=>{setIsOpen(true)}}
                                >StartEnd</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((slot, index)=>(
                            <tr key={index}>
                                <td>{formatTime(slot.time)}</td>

                                <td>

                                    <input
                                    type="text"
                                    value={slot.task}
                                    onChange={
                                        canEdit
                                        ? (e) => handleTaskChange(index, e.target.value)
                                        : undefined
                                    }
                                    readOnly={!canEdit}
                                    className={`border px-2 py-1 rounded w-full ${canEdit ? 'border-[#1E1E2220]' : 'border-white'}`}
                                    />

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isOpen &&
            <div 
                ref= {containerRef}
                className={`fixed z-50 ${position === "left" ? 'translate-x-[250px]': 'translate-x-[750px]'}`}
            >
                <div className="modal">
                    <StartEnd
                        start= {config.start}
                        end= {config.end}
                        interval= {config.interval}
                        changeStart= {config.changeStart}
                        changeEnd= {config.changeEnd}
                        changeInt= {config.changeInt}
                    />
                </div>
            </div>
            }
        </>           
    )
}

export default Planner
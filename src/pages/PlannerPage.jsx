import { useState } from "react";
import Calendar from "../components/Calendar"
import Planner from "../components/Planner"
import { BsPencilSquare } from "react-icons/bs";
import { IoIosReturnLeft } from "react-icons/io";

const PlannerPage= ()=>{  
    const [canEdit, setEdit]= useState(false)
    const [undo, setUndo]= useState(false)


    const handleUndo = () => {
        setUndo(true);
        setEdit(false);

        // reset undo so it can be triggered again
        setTimeout(() => setUndo(false), 0);
    }

    return(
        <>  
            <div className="relative flex-center flex-col gap-5">
                
                <div className="relative w-full flex-center">
                    <Calendar/>
                    {canEdit ?
                    <IoIosReturnLeft 
                        onClick={handleUndo} 
                        className="absolute left-1/2 translate-x-[180px] cursor-pointer"
                    />
                    
                    :<BsPencilSquare 
                        onClick={()=>{setEdit(true)}} 
                        className="absolute left-1/2 translate-x-[180px] cursor-pointer"
                    />
                    }
                </div>         
                
                <div className="flex flex-row gap-40">
                    <Planner 
                        canEdit={canEdit}
                        undo= {undo}    
                    />
                    <Planner 
                        canEdit={canEdit}
                        undo= {undo}   
                    />
                </div>

                {canEdit && 
                    <button onClick={()=> setEdit(false)} className="w-full rounded-md py-1 text-white bg-[#C67C4e] hover:bg-[#F9F2ED] hover:text-[#313131]">Save</button>
                }                

            </div>
        </>
    )
}

export default PlannerPage
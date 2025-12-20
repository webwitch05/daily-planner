import Calendar from "../components/Calendar"
import Planner from "../components/Planner"

const PlannerPage= ()=>{  
    return(
        <>  
            <div className="flex-center flex-col gap-5 pt-20 pb-20">
                <Calendar/>          
                
                <div className="flex flex-row gap-40">
                    <Planner/>
                    <Planner/>
                </div>
            </div>
        </>
    )
}

export default PlannerPage
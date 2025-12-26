import { createContext, useContext, useState } from 'react';

const PlannerContext= createContext()

export const PlannerProvider= ({children})=>{
    const [startPlanned, setStartPlanned]= useState("06:00:00")
    const [endPlanned, setEndPlanned]= useState("02:00:00")
    const [intervalPlanned, setIntervalPlanned]= useState(60)

    const [startReality, setStartReality]= useState("06:00:00")
    const [endReality, setEndReality]= useState("02:00:00")
    const [intervalReality, setIntervalReality]= useState(60)    

    return(
        <PlannerContext.Provider value={{
            planned:{
                start: startPlanned,
                end: endPlanned,
                interval: intervalPlanned,
                changeStart: setStartPlanned,
                changeEnd: setEndPlanned,
                changeInt: setIntervalPlanned,                 
            },
            reality:{
                start: startReality,
                end: endReality,
                interval: intervalReality,
                changeStart: setStartReality,
                changeEnd: setEndReality,
                changeInt: setIntervalReality,                  
            }
        }}>
            {children}
        </PlannerContext.Provider>
    );
};

export const usePlannerContext = () => useContext(PlannerContext);
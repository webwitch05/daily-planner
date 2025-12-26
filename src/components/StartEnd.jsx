import { defaultTime, intervalOptions } from "../constants"

const StartEnd= ({start, end, interval, changeStart, changeEnd, changeInt})=>{

    const validEndTime = (() => {
        const startIndex = defaultTime.findIndex(time => time === start);
        
        if (startIndex !== -1) {
            return [...defaultTime.slice(startIndex + 1)];
        }
        
        return defaultTime;
    })();

    return(
        <>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row">
                    <p>Start:</p>
                    <select 
                        name= "start"
                        value= {start}
                        onChange= {(e)=>changeStart(e.target.value)}
                    >
                        {defaultTime.map((time)=>(
                            <option key={time} value={time}>{time ? time.slice(0,5) : "--:--"}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row">
                    <p>End:</p>
                    <select 
                        name= "end"
                        value= {end}
                        onChange= {(e)=>changeEnd(e.target.value)}
                    >
                        {validEndTime.map((time)=>(
                            <option key={time} value={time}>{time ? time.slice(0,5) : "--:--"}</option>
                        ))}
                    </select>
                </div>  
                <div className="flex flex-row">
                    <p>Interval:</p>
                    <select 
                        name= "interval"
                        value= {interval}
                        onChange= {(e)=>changeInt(e.target.value)}
                    >
                        {intervalOptions.map((opt)=>(
                            <option key={opt} value={opt}>{opt} mins</option>
                        ))}
                    </select>
                </div>  
            </div>                      
        </>
    )
}

export default StartEnd
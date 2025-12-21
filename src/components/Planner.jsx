import { useEffect, useState } from "react"
import { initialTimeSlots  } from "../../constants"

const Planner= ({ canEdit, undo })=>{
    const [timeSlots, setTimeSlots]= useState(initialTimeSlots)
    const [backup, setBackup] = useState(null);

    useEffect(() => {
        if (canEdit) {
        setBackup(timeSlots);
        }
    }, [canEdit]);    

    useEffect(() => {
        if (undo && backup) {
        setTimeSlots(backup);
        }
    }, [undo]);

    const handleTaskChange = (index, value) => {
    setTimeSlots((prev) =>
        prev.map((slot, i) =>
        i === index ? { ...slot, task: value } : slot
        ));
    };

    return(
        <>
            <div className="flex-center flex-col">
                <table className="w-[80%]">
                    <thead>
                        <tr>
                            <th colSpan={2}>Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot, index)=>(
                            <tr key={index}>
                                <td>{slot.time}</td>

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
        </>           
    )
}

export default Planner
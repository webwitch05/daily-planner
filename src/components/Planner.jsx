import { useEffect, useState } from "react"

const Planner= ({ todos, canEdit, onChange, undo })=>{
    const [backup, setBackup] = useState(null);

    useEffect(() => {
        if (canEdit) {
            setBackup(todos);  // Deep copy
        }
    }, [canEdit]);    

    useEffect(() => {
        if (undo && backup) {
        onChange(backup);
        }
    }, [undo, backup, onChange]);

    const handleTaskChange = (index, value) => {
        onChange((prev) =>
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
                        {todos.map((slot, index)=>(
                            <tr key={index}>
                                <td>{slot.time ? slot.time.slice(0, 5) : '--:--'}</td>

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
import { timeSlots } from "../../constants"

const Planner= ()=>{
    return(
        <table className="w-[80%]">
            <thead>
                <tr>
                    <th colSpan={2}>Schedule</th>
                </tr>
            </thead>
            <tbody>
                {timeSlots.map((time, index)=>(
                    <tr key={index}>
                        <td>{time}</td>
                        <td>task</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Planner
import { format, addMinutes, startOfDay } from "date-fns";

let current= startOfDay(new Date()).setHours(6);
const initialTimeSlots= []

for (let i=0; i<18; i++){
    initialTimeSlots.push({
        time: format(current, "HH:mm"), 
        task: "task"
});
    current= addMinutes(current, 60)
}

export {
    initialTimeSlots,
}
import { format, addMinutes, startOfDay } from "date-fns";

let current= startOfDay(new Date()).setHours(6);
const timeSlots= []

for (let i=0; i<18; i++){
    timeSlots.push(format(current, "HH:mm"));
    current= addMinutes(current, 60)
}

export {
    timeSlots,
}
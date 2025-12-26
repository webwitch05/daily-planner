import { format, addMinutes, startOfDay, setHours } from "date-fns";

const intervalOptions= [15, 30, 60]

let start = setHours(startOfDay(new Date()), 6);
const defaultStart = setHours(startOfDay(new Date()), 6);
const defaultEnd = setHours(startOfDay(new Date()), 26);

const defaultTime= []
const defaultTodos= []

while (start<=defaultEnd){
    defaultTime.push(format(start, "HH:mm:ss"));
    defaultTodos.push({
        time: format(start, "HH:mm:ss"), 
        task: ""
});
    start= addMinutes(start, intervalOptions[2])
}

export {
    defaultTime,
    defaultTodos,
    intervalOptions,
    defaultStart,
    defaultEnd,
}
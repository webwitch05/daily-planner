import { format, addMinutes, startOfDay } from "date-fns";

let current= startOfDay(new Date()).setHours(6);
const defaultTodos= []

for (let i=0; i<18; i++){
    defaultTodos.push({
        time: format(current, "HH:mm:ss"), 
        task: ""
});
    current= addMinutes(current, 60)
}

export {
    defaultTodos,
}
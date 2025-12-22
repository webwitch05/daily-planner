import { supabase } from './supabaseClient'

const fetchPlanned= async(date)=> {
    const { data, error }= await supabase
        .from("planned_tasks")
        .select("*")
        .eq("planner_date", date)
        .order("planned_time")

        if (error){
            console.error("Error fetching:", error)
        } else{
            return data.map((slot)=>({
                time: slot.planned_time,
                task: slot.task
            }))
        }
}

const fetchReality= async(date)=> {
    const { data, error }= await supabase
        .from("actual_tasks")
        .select("*")
        .eq("planner_date", date)
        .order("planned_time")

        if (error){
            console.error("Error fetching:", error)
        } else{
            return data.map((slot)=>({
                time: slot.planned_time,
                task: slot.task
            }))
        }
}

const editTodos= (todos, target)=>{
    todos.map((slot)=>{
        if (slot.id == target.id){
            slot.planned_time= target.planned_time
            slot.task= target.task
        }
    })
    return todos
}

const updatePlanned= async (payload)=>{
    const { error }= await supabase
        .from("planned_tasks")
        .upsert(payload)

    if (error){
        console.error("Planned update error:", error);
    }
}

const updateReality= async (payload)=>{
    const { error }= await supabase
        .from("actual_tasks")
        .upsert(payload)

    if (error){
        console.error("Actual update error:", error);
    }
}

export {
    fetchPlanned,
    fetchReality,
    editTodos,
    updatePlanned,
    updateReality,
}
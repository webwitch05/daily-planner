import { supabase } from './supabaseClient'

const fetchPlanned= async(date)=> {
    const { data, error }= await supabase
        .from("planned_tasks")
        .select("*")
        .eq("planner_date", date)

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

const updatePlanned = async (payload, date, intervalChanged= false) => {

    if (intervalChanged){
        const { data: existing, error: deleteError } = await supabase
            .from("planned_tasks")
            .delete()
            .eq('planner_date', date);
        
        if (existing.length==0) return

        if (deleteError) {
            console.error("Delete planned tasks error:", deleteError);
            throw deleteError;
        }
    }

    if (payload.length > 0) {
        const { error: insertError } = await supabase
            .from("planned_tasks")
            .upsert(payload, {
                onConflict: "planner_date,planned_time"
            });

        if (insertError) {
            console.error("Insert planned tasks error:", insertError);
            throw insertError;
        }
    }
};

const updateReality = async (payload, date, intervalChanged= false) => {

    if (intervalChanged){
        const { data: existing, error: deleteError } = await supabase
            .from("actual_tasks")
            .delete()
            .eq('planner_date', date);
        
        if (existing.length==0) return

        if (deleteError) {
            console.error("Delete reality tasks error:", deleteError);
            throw deleteError;
        }
    }

    if (payload.length > 0) {
        const { error: insertError } = await supabase
            .from("actual_tasks")
            .upsert(payload, {
                onConflict: "planner_date,planned_time"
            });

        if (insertError) {
            console.error("Insert reality tasks error:", insertError);
            throw insertError;
        }
    }
};

export {
    fetchPlanned,
    fetchReality,
    editTodos,
    updatePlanned,
    updateReality,
}
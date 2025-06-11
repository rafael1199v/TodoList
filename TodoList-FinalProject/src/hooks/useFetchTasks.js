import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import taskService from "../services/TaskService";

export const useFetchTasks = () => {
    const [tasks, setTasks] = useState([]);
    const auth = useAuthContext();

    const getTasks = async () => {
        const data = await taskService.getTasks(auth.session.user.id);
        setTasks(data);
    }

    useEffect(() => {   
        getTasks();
    }, []);


    return { tasks, getTasks };
}
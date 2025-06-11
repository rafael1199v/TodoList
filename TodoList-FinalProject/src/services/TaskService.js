import SupabaseClient from "./SupabaseClient";

class TaskService {
    constructor() {
        this.client = new SupabaseClient();
    }

    async postTask(taskForm) {
        const parsedForm = this.parseForm(taskForm);

        const { data, error } = await this.client
            .from('tasks')
            .insert({
                title: parsedForm.title,
                description: parsedForm.description,
                end_date: parsedForm.end_date,
                category_id: parsedForm.categoryId,
                user_id: parsedForm.userId
            });

        if(error) {
            console.error(error.message);
            throw new Error("Hubo un error al crear la tarea");
        }
    }

    async getTasks(uuid) {
        const { data, error } = await this.client
            .from('tasks')
            .select(`
                id,
                title,
                description,
                end_date,
                state,
                categories (
                    id,
                    name
                )    
            `)
            .eq('user_id', uuid);

        
        if(error){
            console.error(error);
            throw new Error("Hubo un error al conseguir las tareas. Recarga la pagina");
        }

        return data;
    }

    async deleteTask(id) {
        
    }


    async getTask(id) {

        const { data, error } = await this.client
            .from('tasks')
            .select(`
                id,
                title,
                description,
                end_date,
                state,
                categories (
                    id,
                    name
                )    
            `)
            .eq('id', id)
            .single();

        if(error){
            console.error(error);
            throw new Error("Hubo un error obtener la tarea. Intentalo de nuevo");
        }
        
        return this.parseTaskToForm(data);
    }

    async updateTask(taskForm, id) {
        const parsedForm = this.parseForm(taskForm);

        const { error } = await this.client
            .from('tasks')
            .update({
                title: parsedForm.title,
                description: parsedForm.description,
                end_date: parsedForm.end_date,
                category_id: parsedForm.categoryId,
                user_id: parsedForm.userId
            })
            .eq('id', id);

        if(error){
            console.error(error);
            throw new Error("Hubo un error al modificar la tarea. Intentalo de nuevo");
        }

    }

    parseForm(taskForm) {
        const parsedForm = {...taskForm};

        parsedForm.description = (!parsedForm.description.trim() ? null : parsedForm.description);
        parsedForm.end_date = (!parsedForm.end_date.trim() ? null : parsedForm.end_date);
        parsedForm.categoryId = parsedForm.categoryId.toString();
        parsedForm.categoryId = (!parsedForm.categoryId.trim() ? null : parsedForm.categoryId);

        return parsedForm;
    }


    parseTaskToForm(task) {
        const parsedTask = {...task};

        parsedTask.description = (parsedTask.description ? parsedTask.description : "");
        parsedTask.end_date = (parsedTask.end_date ? new Date(parsedTask.end_date).toISOString().split("T")[0] : "");
        parsedTask.categoryId = (parsedTask.categories ? parsedTask.categories.id : "");

        return parsedTask;
    }
}


const taskService = new TaskService();
export default taskService;
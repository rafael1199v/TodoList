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


    parseForm(taskForm) {
        const parsedForm = {...taskForm};

        parsedForm.description = (!parsedForm.description.trim() ? null : parsedForm.description);
        parsedForm.end_date = (!parsedForm.end_date.trim() ? null : parsedForm.end_date);
        parsedForm.categoryId = (!parsedForm.categoryId.trim() ? null : parsedForm.categoryId);

        return parsedForm;
    }
}


const taskService = new TaskService();
export default taskService;
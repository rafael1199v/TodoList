class TaskFormValidator {
    validate(taskForm) {
        const errors = {};

        if(!taskForm.title.trim())
            errors.title = "La tarea debe tener un titulo";

        return errors;
    }
}


export default TaskFormValidator;   
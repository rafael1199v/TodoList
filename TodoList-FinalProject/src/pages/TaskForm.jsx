
import Input from "../components/Input";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import ValidationForm from "../services/validation/ValidationForm";
import TaskFormValidator from "../services/validation/strategies/TaskFormValidator";
import { useAlert } from "../context/AlertContext";
import { useParams } from "react-router-dom";
import taskService from "../services/TaskService";
import { useFetchCategories } from "../hooks/useFetchCategories";

function TaskForm() {
  const auth = useAuthContext();
  const { showAlert } = useAlert();
  const { id } = useParams();
  const [errors, setErrors] = useState(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    end_date: "",
    categoryId: "",
    userId: auth.session.user.id,
  });
  const [onSubmitting, setOnSubmitting] = useState(false);
  const { categories } = useFetchCategories();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if(!validate())
        return;

    if(onSubmitting === true)
      return;

    try {
      setOnSubmitting(true);
      await taskService.postTask(task);
      showAlert("Operacion exitosa", "Tarea creada correctamente. Revisa a lista de tareas!!!", "success");

      setTask({
        title: "",
        description: "",
        end_date: "",
        categoryId: "",
        userId: auth.session.user.id,
      });

    }
    catch(error){
      console.log(error.message);
      showAlert("Operacion fallida", "La tarea no pudo ser creada correctamente", "danger");
    }
    finally{
      setOnSubmitting(false);
    }
    

    
  }

  useEffect(() => {

  }, []);

  const validate = () => {
    const validator = new ValidationForm(new TaskFormValidator());
    const formErrors = validator.validate(task);
    const hasErrors = Object.keys(formErrors).length !== 0;

    setErrors(hasErrors ? formErrors : null);
    
    return !hasErrors;
  }

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl">Crear tarea</h1>

      <form className="w-[30%]" onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="taskName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Titulo
          </label>
          <Input
            type={"text"}
            name={"taskName"}
            placeholder={"Titulo de la tarea"}
            maxlength={30}
            onChange={(e) =>
              setTask((prevTask) => ({ ...prevTask, title: e.target.value }))
            }
            value={task.title}
          />

          { errors && errors.title && (
            <p className='text-red-500'> { errors.title } </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion (opcional)
          </label>
          <Input
            type={"text"}
            name={"description"}
            placeholder={"Descripcion de la tarea"}
            maxlength={30}
            onChange={(e) =>
              setTask((prevTask) => ({
                ...prevTask,
                description: e.target.value,
              }))
            }
            value={task.description}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="endDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fecha limite (opcional)
          </label>
          <Input
            type={"date"}
            name={"endDate"}
            placeholder={"Tarea 1"}
            maxlength={30}
            onChange={(e) =>
              setTask((prevTask) => ({ ...prevTask, end_date: e.target.value }))
            }
            value={task.end_date}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Categoria
          </label>
          <select className="peer mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm p-3 focus:outline-amber-500"
            onChange={(e) => setTask((prevTask) => ({...prevTask, categoryId: e.target.value}))}
            value={task.categoryId}
          >
            <option value="">Ninguno</option>
            
            { categories.map((category => (
              <option value={category.id} key={category.id}> { category.name } </option>
            )))}
          </select>
        </div>

        <button
          className="inline-block w-full rounded-sm border border-orange-400 bg-orange-400 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-orange-400 focus:ring-3 focus:outline-hidden disabled:opacity-20 cursor-pointer"
          href="#"
          type="submit"
          disabled={onSubmitting}
        >
          Crear Categoria
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

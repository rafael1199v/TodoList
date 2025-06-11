import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate } from "react-router-dom"
import PencilSquare from '../components/Icons/PencilSquare';
import TrashIcon from '../components/Icons/TrashIcon';
import { useFetchTasks } from '../hooks/useFetchTasks';
import taskService from '../services/TaskService';
import { useAlert } from '../context/AlertContext';

function Home() {
  const navigate = useNavigate();
  const { tasks, getTasks } = useFetchTasks();
  const { showAlert } = useAlert();

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      return true;
    }
    catch(error) {
      showAlert("Operacion fallida.", error.message,"danger");
      return false;
    }
  } 

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Tareas</h1>
        <Button name="Crear tarea" onClick={() => navigate('/tasks/create')}/>
      </div>

      {tasks.length === 0 ? (
        <Alert 
          type="info" 
          title="¡No hay tareas!" 
          message="No tienes tareas creadas. ¡Comienza creando una!"
        />
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} 
              className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 
                ${task.state ? 'bg-gray-50' : ''}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3 flex-grow">
                  <input
                    type="checkbox"
                    value={task.state}
                    className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <div className={task.state ? 'opacity-75' : ''}>
                    <h3 className={`font-semibold text-lg text-gray-800 ${task.state ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    
                    <p className={`text-gray-600 mt-1 ${task.state ? 'line-through' : ''}`}>
                      {task.description}
                    </p>
                  
                    <div className={`mt-3 text-sm text-gray-500 ${task.state ? 'line-through' : ''}`}>
                      Fecha límite: {task.end_date ? new Date(task.end_date).toLocaleDateString("es-ES", { timeZone: "UTC" }) : "Sin fecha limite"}
                    </div>
                  
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`${task.categories ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded
                    ${task.state ? 'opacity-75' : ''}`}>
                    {task.categories ? task.categories.name : "Ninguno"}
                  </span>

                  <button 
                    className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/tasks/edit/${task.id}`)}
                  >
                    <PencilSquare className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                    onClick={async () => {
                      await deleteTask(task.id);
                      await getTasks();
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
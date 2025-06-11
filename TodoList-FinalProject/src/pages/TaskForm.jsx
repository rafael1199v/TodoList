import Input from '../components/Input';

function TaskForm() {
  return (
    <div className='w-full h-screen flex flex-col gap-5 justify-center items-center'>
      <h1 className='text-3xl'>Crear categoria</h1>

      <form className='w-[30%]'>
        <div className='mb-5'>
          <label
            htmlFor='taskName'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Titulo
          </label>
          <Input
            type={'text'}
            name={'taskName'}
            placeholder={'Titulo de la tarea'}
            maxlength={30}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Descripcion (opcional)
          </label>
          <Input
            type={'text'}
            name={'description'}
            placeholder={'Descripcion de la tarea'}
            maxlength={30}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='endDate'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Fecha limite (opcional)
          </label>
          <Input
            type={'date'}
            name={'endDate'}
            placeholder={'Tarea 1'}
            maxlength={30}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
           Categoria
          </label>
          <select className='peer mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm p-3 focus:outline-amber-500'>
            <option value="">Ninguno</option>
          </select>
        </div>


        <button
            className="inline-block w-full rounded-sm border border-orange-400 bg-orange-400 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-orange-400 focus:ring-3 focus:outline-hidden"
            href="#"
            onClick={async () => {
            await updateCategory(newName);
            await getCategories();
            }}
        >
            Crear Categoria
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

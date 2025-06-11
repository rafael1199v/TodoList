import Button from '../components/Button';
import Input from '../components/Input';
import { useCategoryForm } from '../hooks/useCategoryForm';
import Alert from '../components/Alert';
import { useFetchCategories } from '../hooks/useFetchCategories';
import UpdateCategoryModal from '../components/UpdateCategoryModal';
import { useUpdateCategoryModal } from '../hooks/useUpdateCategoryModal';

function Categories() {
  const { categoryName, onChange, createCategory, errorMessage } = useCategoryForm();
  const { categories, getCategories, loading } = useFetchCategories();
  const { isOpenUpdateModal, openUpdateModal, closeUpdateModal, selectedCategory, setSelectedCategory, updateCategory, updateError } = useUpdateCategoryModal();

  if(loading) {
    return <p>Cargando...</p>
  }

  return (
    <div className='mt-10'>

      { errorMessage && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/3'>
          <Alert title={"Hubo un error al crear la categoria"} message={errorMessage} type={"danger"}/>
        </div>
      )}

      <div className='text-3xl text-center mb-5'>Categorias</div>

      <div className='flex flex-row justify-center gap-3'>
        <Input
          name={'Categoria'}
          type={'text'}
          placeholder={'Nombre de la categoria'}
          onChange={onChange}
          maxlength={25}
          value={categoryName}
        />

        <Button 
          name={'Crear'}
          onClick={async () => {
            await createCategory();
            await getCategories();
          }}
          disabled={categoryName === ""}
        />
      </div>
      
      <div className='flex flex-row gap-100 mt-5 border-b-1'>
        <h3 className='font-bold'>Nombre de la categoria</h3>
        <h3 className='font-bold'>Accion</h3>
      </div>

      
      { categories.map((category) => (
        <div className='flex flex-row justify-between mt-5 border-b border-b-amber-600' key={category.id}>
          <p>{ category.name} </p>
          <div>
            <a onClick={() => {
              setSelectedCategory(category);
              openUpdateModal();
            }}>Editar</a> {' '}
            <a>Eliminar</a>
          </div>
        </div>
      ))}
      
      { categories.length === 0 && (
        <Alert title={"No tienes categorias creadas"} message={"Intenta crear una nueva."} type={"info"}/>
      )}

      { isOpenUpdateModal && (
        <UpdateCategoryModal 
          onClose={closeUpdateModal}
          updateCategoryName={selectedCategory.name} 
          updateCategory={updateCategory} 
          updateError={updateError}
          getCategories={getCategories}
        />
      )}
      
      
    </div>
  );
}

export default Categories;

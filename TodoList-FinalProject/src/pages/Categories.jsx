import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useCategoryForm } from '../hooks/useCategoryForm';
import Alert from '../components/Alert';

function Categories() {
  const { categoryName, onChange, createCategory, errorMessage } = useCategoryForm();

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
          onClick={createCategory}
          disabled={categoryName === ""}
        />
      </div>
      
      <div className='flex flex-row gap-100 mt-5 border-b-1'>
        <h3 className='font-bold'>Nombre de la categoria</h3>
        <h3 className='font-bold'>Accion</h3>
      </div>
    </div>
  );
}

export default Categories;

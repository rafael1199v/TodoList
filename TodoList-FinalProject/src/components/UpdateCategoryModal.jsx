import WrapperModal from "./WrapperModal"
import Input from "./Input"
import { useState } from "react"

function UpdateCategoryModal({ updateCategoryName, onClose, updateCategory, updateError, getCategories }) {
  const [newName, setNewName] = useState(updateCategoryName);

  return (
    <WrapperModal>
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl'>Editar categoria</h1>
          <Input
            name={"categoria"}
            type={"text"}
            onChange={(e) => setNewName(e.target.value)}
            maxlength={25}
            value={newName}
          />

          { updateError && (
            <p className='text-red-500'>{updateError}</p>
          )}

          <div className='flex flex-row gap-5'>
            <a
              className="inline-block rounded-sm border border-gray-400 bg-gray-400 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-gray-400 focus:ring-3 focus:outline-hidden"
              href="#"
              onClick={onClose}
            >
              Cancelar
            </a>
            
            <a
              className="inline-block rounded-sm border border-orange-400 bg-orange-400 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-orange-400 focus:ring-3 focus:outline-hidden"
              href="#"
              onClick={async () => {
                await updateCategory(newName);
                await getCategories();
              }}
            >
              Actualizar
            </a>
          </div>
        </div>
        
      </WrapperModal>
  )
}

export default UpdateCategoryModal
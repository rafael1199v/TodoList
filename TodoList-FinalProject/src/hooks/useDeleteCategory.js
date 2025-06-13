import { useAlert } from "../context/AlertContext"
import categoryService from "../services/CategoryService";

export const useDeleteCategory = () => {
    const { showAlert } = useAlert();

    const deleteCategory = async (id) => {
        try {
            await categoryService.deleteCategory(id);
            showAlert("Operacion exitosa", "Categoria eliminada correctamente", "success");

            return true;
        }
        catch(error) {
            showAlert("Hubo un error", error.message, "danger");

            return false;
        }
    }

    return { deleteCategory }
    
}
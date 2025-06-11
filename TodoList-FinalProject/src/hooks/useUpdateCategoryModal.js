import { useState } from "react"
import ValidationForm from "../services/validation/ValidationForm"
import SingleInputTextValidator from "../services/validation/strategies/SingleInputTextValidator"
import categoryService from "../services/CategoryService"
import { useAuthContext} from "../context/AuthContext"

export const useUpdateCategoryModal = () => {
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const auth = useAuthContext();

    const openUpdateModal = () => {
        setIsOpenUpdateModal(true);
    }

    const closeUpdateModal = () => {
        setIsOpenUpdateModal(false);
        setUpdateError(null);
    }

    const validateUpdateForm = (categoryName) => {
        const validator = new ValidationForm(new SingleInputTextValidator());
        const formErrors = validator.validate(categoryName);
        const existErrors = Object.keys(formErrors).length !== 0;
        setUpdateError(existErrors ? formErrors.text : null);

        return !existErrors;
    }

    const updateCategory = async (newName) => {
        
        if(!selectedCategory){
            console.error("No se ha seleccionado una categoria")
            return;
        }

        if(!validateUpdateForm(newName))
            return;

        try {
            await categoryService.updateCategory(newName, selectedCategory.id, auth.session.user.id);
            closeUpdateModal();
        }
        catch(error) {
            setUpdateError(error.message);
        }
        
    }

    return { isOpenUpdateModal, openUpdateModal, closeUpdateModal, selectedCategory, setSelectedCategory, updateCategory, updateError }
}
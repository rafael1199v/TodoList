import { useState } from "react";
import categoryService from "../services/CategoryService";
import { useAuthContext } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import SingleInputTextValidator from "../services/validation/strategies/SingleInputTextValidator";
import ValidationForm from "../services/validation/ValidationForm"

export const useCategoryForm = () => {
    const [categoryName, setCategoryName] = useState("");
    const auth = useAuthContext();
    const { showAlert } = useAlert();

    const onChange = (e) => {
        setCategoryName(e.target.value);
    };

    const validate = () => {
        const validator = new ValidationForm(new SingleInputTextValidator());
        const errors = validator.validate(categoryName);
        const existError = Object.keys(errors).length !== 0;
        
        if (existError) {
            showAlert("Error de validación", errors.text);
        }

        return !existError;
    }

    const createCategory = async () => {
        if(!validate(categoryName))
            return;

        try {
            await categoryService.postCategory(categoryName, auth.session.user.id);
            setCategoryName("");
        }
        catch(error) {
            console.error(error.message);
            showAlert("Error al crear categoría", error.message);
        }
                
    }

    return { categoryName, onChange, createCategory }
}


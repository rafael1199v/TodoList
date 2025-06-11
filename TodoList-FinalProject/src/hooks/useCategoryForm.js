import { use, useState } from "react";
import categoryService from "../services/CategoryService";
import { useAuthContext } from "../context/AuthContext";
import SingleInputTextValidator from "../services/validation/strategies/SingleInputTextValidator";
import ValidationForm from "../services/validation/ValidationForm"

export const useCategoryForm = () => {
    const [categoryName, setCategoryName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const auth = useAuthContext();

    const onChange = (e) => {
        setCategoryName(e.target.value);
    };

    const validate = () => {
        const validator = new ValidationForm(new SingleInputTextValidator());
        const errors = validator.validate(categoryName);
        const existError = Object.keys(errors).length !== 0;
        setErrorMessage((existError ? errors.text : null));

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
            setErrorMessage(error.message);

            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
                
    }

    return { categoryName, onChange, createCategory, errorMessage }
}


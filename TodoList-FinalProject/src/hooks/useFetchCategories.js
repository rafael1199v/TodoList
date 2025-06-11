import { useEffect, useState } from "react";
import categoryService from "../services/CategoryService";
import { useAuthContext } from "../context/AuthContext";

export const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuthContext();

    const getCategories = async () => {
        const data = await categoryService.getCategories(auth.session.user.id);
        setCategories(data);
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
    }, []);


    return { categories, getCategories, loading };
}
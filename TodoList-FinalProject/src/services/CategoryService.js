import SupabaseClient from './SupabaseClient'

class CategoryService {

    constructor() {
        this.client = new SupabaseClient();
    }

    async getCategories(uuid) {
        const { data, error } = await this.client
            .from('categories')
            .select(`
                id,
                name,
            `)
            .eq('user_id', uuid);

        if(error)
            throw new Error(error.message);

        return data;
    }


    async postCategory(categoryName, uuid) {
        const { data, error } = await this.client
            .from('categories')
            .insert({
                name: categoryName,
                user_id: uuid
            });

        if(error)
            throw new Error(error.message);

        return data;
    }

}

const categoryService = new CategoryService();
export default categoryService;
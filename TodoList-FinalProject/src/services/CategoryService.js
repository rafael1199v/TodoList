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
                name
            `)
            .eq('user_id', uuid);

        if(error)
            throw new Error(error.message);

        return data;
    }


    async postCategory(categoryName, uuid) {
        
        if(await this.existCategory(categoryName, uuid))
            throw new Error("La categoria ya existe");

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

    async updateCategory(newCategoryName, id, uuid) {

        if(await this.existCategory(newCategoryName, uuid))
            throw new Error("La categoria ya existe");

        const { data, error } = await this.client
            .from('categories')
            .update({ name: newCategoryName})
            .eq('id', id);

        if(error)
            throw new Error(error.message);
    }


    async deleteCategory(id) {
        const response = await this.client
            .from('categories')
            .delete()
            .eq('id', id);

        if(response.status != 204)
            throw new Error("Hubo un fallo al momento de eliminar la categoria");
    }


    async existCategory(categoryName, uuid) {
        let data = await this.getCategories(uuid);

        for(let category of data){
            if(category.name.toLowerCase().trim() === categoryName.toLowerCase().trim())
                return true;
        }
        
        return false;
    }

}

const categoryService = new CategoryService();
export default categoryService;
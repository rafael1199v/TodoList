import SupabaseClient from "./SupabaseClient";

class AuthService {
    
    constructor() {
        this.client = new SupabaseClient();
    }

    async SignIn(userForm) {
        const { data, error } = await this.client.auth.signInWithPassword({
            email: userForm.email,
            password: userForm.password
        });

        if(error){
            console.error(error);
            let additionalInformation = (error.message === "Invalid login credentials" ? " Credenciales incorrectas": "");
            throw new Error(`Hubo un error al iniciar sesión.${additionalInformation}`);
        }

        return data;
    }


    async SignOut() {
        const { error } = await this.client.auth.signOut();

        if(error) {
            console.error(error)
            throw new Error("Error la cerrar la sesión");
        }
    }
}


export default new AuthService();
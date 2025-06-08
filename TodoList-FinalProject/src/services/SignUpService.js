import SupabaseClient from './SupabaseClient'

class SignUpService {

    constructor() {
        this.client = new SupabaseClient();
    }

    async signUp(user) {

        const { data, error } = await this.client.auth.signUp({
            email: user.email,
            password: user.password
        });

        if(error) {
            console.error(error.message);
            let additionalInformation = "";

            if(error.message === "User already registered")
                additionalInformation = "La cuenta ya está en uso.";

            throw new Error(`Hubo un error al registrar al usuario. ${additionalInformation}`);
        }

        return data;
    }
}


export default new SignUpService()
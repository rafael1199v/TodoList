class SignUpFormValidator {
    
    validate(signUpForm) {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!signUpForm.email.trim()) 
            errors.email = "El correo es requerido";
        else if(!emailRegex.test(signUpForm.email))
            errors.email = "El correo es invalido";

        if(!signUpForm.password.trim())
            errors.password = "La contraseña es requerida"
        else if(signUpForm.password.length < 6)
            errors.password = "La contraseña debe contar con al menos seis caracteres";

        if(signUpForm.password !== signUpForm.confirmPassword)
            errors.confirmPassword = "Las contraseñas no coinciden";


        return errors;
    }
}


export default SignUpFormValidator;
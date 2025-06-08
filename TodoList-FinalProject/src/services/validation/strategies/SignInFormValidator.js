class SignInFormValidator {

    validate(signInForm) {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!signInForm.email.trim())
            errors.email = "El correo es requerido";
        else if(!emailRegex.test(signInForm.email))
            errors.email = "El correo es invalido";

        if(!signInForm.password.trim())
            errors.password = "La contraseña es requerida";

        return errors;
    } 
}


export default SignInFormValidator;
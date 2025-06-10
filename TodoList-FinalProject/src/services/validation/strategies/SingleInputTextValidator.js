class SingleInputTextValidator {
    validate(text) {
        const errors = {};

        if(!text.trim())
            errors.text = "El campo no debe estar vacio";

        return errors;
    }
}


export default SingleInputTextValidator;
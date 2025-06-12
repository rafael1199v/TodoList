import { describe, expect, test } from "vitest";
import ValidationForm from "../services/validation/ValidationForm"
import SignUpFormValidator from "../services/validation/strategies/SignUpFormValidator";

describe('Formulario de registro', () => { 
    test('Formulario con campos validos', () => {
        //Arrange
        const signUpForm = {
            email: 'rafael1199v@gmail.com',
            password: 'rafael',
            confirmPassword: 'rafael'
        };
        const validator = new ValidationForm(new SignUpFormValidator());

        //Act
        const errors = validator.validate(signUpForm);
        const numberOfErrors = Object.keys(errors).length;

        //Assert
        expect(numberOfErrors).toBe(0);
    });

    test('Formulario con campos vacios', () => {
        //Arrange
        const signUpForm = {
            email: '',
            password: '',
            confirmPassword: ''
        };
        const validator = new ValidationForm(new SignUpFormValidator());

        //Act
        const errors = validator.validate(signUpForm);
        const numberOfErrors = Object.keys(errors).length;
        const emailError = errors.email;
        const passwordError = errors.password;
        const confirmPasswordError = errors.confirmPassword;

        //Assert
        expect(numberOfErrors).toBeGreaterThan(0);
        expect(emailError).toBe("El correo es requerido");
        expect(passwordError).toBe("La contraseña es requerida");
        expect(confirmPasswordError).toBe("La confirmacion de contraseña es requerida");
    });

    test('Formulario con correo invalido', () => {
        //Arrange
        const signUpForm = {
            email: 'rafael',
            password: 'rafael',
            confirmPassword: 'rafael'
        };
        const validator = new ValidationForm(new SignUpFormValidator());

        //Act
        const errors = validator.validate(signUpForm);
        const numberOfErrors = Object.keys(errors).length;
        const emailError = errors.email;
        
        //Assert
        expect(numberOfErrors).toBeGreaterThan(0);
        expect(emailError).toBe("El correo es invalido");
    });

    test('Formulario con contraseñas distintas', () => {
        //Arrange
        const signUpForm = {
            email: 'rafael@gmail.com',
            password: 'rafael123',
            confirmPassword: 'rafael12'
        };
        const validator = new ValidationForm(new SignUpFormValidator());

        //Act
        const errors = validator.validate(signUpForm);
        const numberOfErrors = Object.keys(errors).length;
        const confirmPasswordError = errors.confirmPassword;
        
        //Assert
        expect(numberOfErrors).toBeGreaterThan(0);
        expect(confirmPasswordError).toBe("Las contraseñas no coinciden");
    });
});
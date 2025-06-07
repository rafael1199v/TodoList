class ValidationForm {

    #strategy = null;

    constructor(strategy = null) {
        this.#strategy = strategy;        
    }

    validate(form) {
        if(!this.#strategy)
            throw new Error("No se ha definido una estrategia");

        return this.#strategy.validate(form);
    }

    setStrategy(newStrategy) {
        this.#strategy = newStrategy;
    }

}

export default ValidationForm;
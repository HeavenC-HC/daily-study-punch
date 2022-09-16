import React from 'react';
import { FormContext } from './context';
import useForm from './useForm';

function Form({children, form}) {
    let formInstance = useForm(form);

    const submit = e => {
        e.preventDefault();
    }

    console.log(formInstance);

    return (
        <form onSubmit={submit}>
                <FormContext.Provider value={formInstance}>
                    {children}
                </FormContext.Provider>
        </form>
    );
}

export default Form;
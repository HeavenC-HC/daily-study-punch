import React from 'react';
import { FormContext } from './context';
import useForm from './useForm';

function Form({children, form, onFinish, onFinishFailed}, ref) {
    let [formInstance] = useForm(form);

    React.useImperativeHandle(ref, () => formInstance)


    formInstance.setCallback({onFinish, onFinishFailed})

    const submit = e => {
        e.preventDefault();
        formInstance.submit();
    }

    return (
        <form onSubmit={submit}>
                <FormContext.Provider value={formInstance}>
                    {children}
                </FormContext.Provider>
        </form>
    );
}

export default Form;
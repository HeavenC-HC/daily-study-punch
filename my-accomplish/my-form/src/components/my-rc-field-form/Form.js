import React from 'react';
import { FieldContext } from './FieldContext';
import useForm from './useForm';



function Form({form, onFinish, onFinishFailed, children}, ref) {
    const [formInstance] = useForm(form);

    React.useImperativeHandle(ref, () => formInstance)
    formInstance.setCallbacks({
        onFinish,
        onFinishFailed
    })

    return (
        <FieldContext.Provider value={formInstance}>
            <form onSubmit={e => {
                e.preventDefault();
                formInstance.submit()
            }}>
                { children }
            </form>
        </FieldContext.Provider>
    );
}

export default Form;
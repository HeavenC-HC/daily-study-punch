import React from 'react';
import Field from "./Field";
import _Form from "./Form";
import useForm from "./useForm";

const Form = React.forwardRef(_Form);
Form.Field = Field;
Form.useForm = useForm;

export {
    Field,
    useForm
};
export default Form;
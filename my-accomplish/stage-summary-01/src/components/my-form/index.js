import _Form from './Form';
import FormItem from './FormItem';
import useForm from './useForm';

const Form = _Form;
Form.useForm = useForm;
Form.FormItem = FormItem;

export {
    FormItem,
    useForm
};
export default Form;

import React, { useContext } from 'react';
import { FormContext } from './context';

function FormItem(props) {
    const {name, children} = props;
    const [, forceUpdate] = React.useReducer(x => x + 1)
    const form = useContext(FormContext);
    const {setListener, getFiledValue, setFieldsValue} = form;

    React.useLayoutEffect(() => {
        let unListener = setListener({props, onStoreChange: forceUpdate})
        return () => {
            unListener();
        }
    }, [])

    const getControlled = () => {
        
        console.log( form);
        return {
            value: getFiledValue(name),
            onChange: e => {
                console.info(e)
                setFieldsValue({
                    [name]: e.target.value
                })
            }

        }
    }

    const Element = React.cloneElement(children, getControlled())

    return Element;
}

export default FormItem;
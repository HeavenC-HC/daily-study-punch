import React, { useContext, useLayoutEffect, useReducer } from 'react';
import { FieldContext } from './FieldContext';

function Field(props) {
    const {name, children} = props;
    const {getFieldValue, setFieldsValue, setListener} = useContext(FieldContext);
    const [, forceUpdate] = useReducer(x => x + 1, 0)


    useLayoutEffect(()=>{
        const unListener = setListener({
            props,
            onStoreChange: forceUpdate
        })
        return () => {
            unListener();
        }
    }, [])

    const getControlled = () => {
        return {
            value: getFieldValue(name),
            onChange: e => {
                console.info(e.target.value)
                setFieldsValue({
                    [name]: e.target.value
                })
            }
        }
    }

    let FieldElement = React.cloneElement(children, getControlled())
    return (FieldElement);
}

export default Field;
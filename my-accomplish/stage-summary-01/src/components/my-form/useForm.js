
import React from 'react';

class FormStore {
    constructor(){
        this.store = {};
        this.listener = [];
    }

    setListener = newListener => {
        this.listener.push(newListener);
        return () => {
            this.listener = this.listener.filter(item => item !== newListener)
        }
    }


    setFieldsValue = (newStore) => {
        this.store ={
            ...this.store,
            ...newStore
        }
        this.listener.forEach(item => item.onStoreChange())
    }

    getFieldsValue = () => {
        return this.store;
    }

    getFiledValue = (name) => {
        return this.store[name];
    }


    getForm = () => {
        return {
            setListener: this.setListener,
            setFieldsValue: this.setFieldsValue,
            getFiledValue: this.getFiledValue,
            getFieldsValue: this.getFieldsValue,
        }
    }
}



function useForm(form) {
    let formRef = React.useRef(null)
    if(!formRef.current){
        if(!form){
            formRef.current = new FormStore().getForm()
        }else{
            formRef.current = form;
        }
    }
    return [formRef.current];
}

export default useForm;
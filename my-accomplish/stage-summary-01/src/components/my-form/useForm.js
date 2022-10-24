
import React from 'react';
class FormStore {
    constructor(){
        this.store = {};
        this.callbacks = {};
        this.listener = [];
    }

    setListener = newListener => {
        this.listener.push(newListener);
        return () => {
            this.listener = this.listener.filter(item => item !== newListener)
        }
    }

    setCallback = newCallback => {
        this.callbacks = {
            ...this.callbacks,
            ...newCallback
        };
    }

    setFieldsValue = (newStore) => {
        this.store ={
            ...this.store,
            ...newStore
        }
        this.listener.forEach(item => {
            Object.keys(newStore).forEach(key => {
                if(key === item.props.name){
                    item.onStoreChange()
                }
            })
        })
    }

    getFieldsValue = () => {
        return this.store;
    }

    getFiledValue = (name) => {
        return this.store[name];
    }

    submit = () => {
        let errs = this.validate()
        
        const {onFinish, onFinishFailed} = this.callbacks;
        if(errs.length === 0){
            onFinish(this.getFieldsValue())
        }else{
            onFinishFailed(errs, this.getFieldsValue())
        }
    }

    validate = () => {
        let err = [];
        this.listener.forEach(item => {
            const {name, rules} = item.props;
            let rule = rules[0]
            let value = this.getFiledValue(name)
            if(rule && rule.required && (value === undefined || value === '')){
                err.push({[name]: rule.message, value})
            }
        })
        return err;
    }





    getForm = () => {
        return {
            setListener: this.setListener,
            setCallback: this.setCallback,
            setFieldsValue: this.setFieldsValue,
            getFiledValue: this.getFiledValue,
            getFieldsValue: this.getFieldsValue,
            submit: this.submit,
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
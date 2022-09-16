
import { useRef } from 'react';

class FormStore{
    constructor(){
        this.store = {};
        this.callbacks = {};
        this.listeners = [];
    }

    setListener = newListener => {
        this.listeners.push(newListener)
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== newListener);
        }
    }

    setCallbacks = newCallbacks => {
        this.callbacks = {
            ...this.callbacks,
            ...newCallbacks,
        }
    }

    getFieldsValue = () => {
        return this.store;
    }

    getFieldValue = name => {
        return this.store[name];
    }

    setFieldsValue = newStore => {
        this.store = {
            ...this.store,
            ...newStore
        }
        this.listeners.forEach(listener => {
            Object.keys(this.store).forEach(key => {
                if(listener.props.name === key){
                    listener.onStoreChange();
                }
            })
        })
    }

    validate = () => {
        let errs = [];
        this.listeners.forEach(listener => {
            const {name, rules} = listener.props;
            const rule = rules[0];
            const value = this.getFieldValue(name);
            if(rule && rule.required && !value){
                errs.push({
                    [name]:rule.message,
                    value
                })
            }
        })
        return errs;
    }

    submit = () => {
        let errs = this.validate();
        const {onFinish, onFinishFailed} = this.callbacks;
        if(errs.length === 0){
            onFinish(this.getFieldsValue())
        }else{
            onFinishFailed(errs, this.getFieldsValue())
        }
    }

    getForm = () => {
        return {
            setListener: this.setListener,
            setCallbacks: this.setCallbacks,
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
            submit: this.submit,
        }
    }

}

function useForm(form) {
    let formRef = useRef();
    if(!formRef.current){
        if(form){
            formRef.current = form;
        }else{
            formRef.current = new FormStore().getForm();
        }
    }
    return [formRef.current];
}

export default useForm;
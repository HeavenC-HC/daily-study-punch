import { useRef } from "react";


class FormStore {
    constructor(){
        this.store = {};
    }

    getFieldValue = (name) => {
        return this.store[name]
    }

    getFieldsValue = () => {
        return {...this.store}
    }

    // setFieldValue = (name) => {
    //     this.store[name] = 
    //     return this.store[name]
    // }

    setFieldsValue = (newStore) => {
        this.store = {
            ...this.store,
            ...newStore
        }
    }

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
        }
    }
}

function useForm(props) {
    //存值，在组件卸载之前指向的都是同一个值
    const formRef = useRef();
    if(!formRef.current){
        const formStore = new FormStore();
        formRef.current = formStore.getForm();
    }
    return (
        [formRef.current]
    );
}

export default useForm;
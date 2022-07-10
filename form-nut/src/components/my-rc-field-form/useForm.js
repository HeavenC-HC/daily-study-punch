import { useRef } from "react";


class FormStore {
    constructor(){
        this.store = {};
        this.fieldEntities = [];
        this.callbacks = {};

    }

    setCallbacks = callbacks => {
        this.callbacks = { ...this.callbacks, ...callbacks,}
    }

    //注册与取消注册
    // 订阅与取消订阅
    registerFieldEntities = entity => {
        this.fieldEntities.push(entity)
        return () => {
            this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
            delete this.store[entity.props.name]
        }
    }


    getFieldValue = (name) => {
        return this.store[name]
    }

    getFieldsValue = () => {
        return {...this.store}
    }

    setFieldsValue = (newStore) => {
        //1.update store
        this.store = {
            ...this.store,
            ...newStore,
        }
        //2.update Field
        this.fieldEntities.forEach(entity=>{
            Object.keys(newStore).forEach(k=>{
                if(k === entity.props.name){
                    entity.onStoreChange()
                }
            })
        })
    }

    validate = () => {
        let err = [];
        
        // 简版校验
        this.fieldEntities.forEach(entity => {
            const {name, rules} = entity.props;
            const value = this.getFieldValue(name);
            let rule = rules[0]
            if(rule && rule.required && (value === undefined || value === '')){
                err.push({[name]: rule.message, value})
            }
        })

        return err;
    }

    submit = () => {
        console.log('submit');
        let err = this.validate();
        const {onFinish, onFinishFailed} = this.callbacks;
        if(err.length === 0){
            // 校验通过
            onFinish(this.getFieldsValue())
        }else{
            // 校验不通过
            onFinishFailed(err, this.getFieldsValue())
        }
    }

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
            registerFieldEntities: this.registerFieldEntities,
            submit: this.submit,
            setCallbacks: this.setCallbacks,
        }
    }

}

function useForm(form) {
    //存值，在组件卸载之前指向的都是同一个值
    const formRef = useRef();

    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }
    return [formRef.current];
}

export default useForm;
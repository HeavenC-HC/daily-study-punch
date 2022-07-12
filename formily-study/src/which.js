import { createForm } from "@formily/core";
import { observable, Tracker } from '@formily/reactive';
import { observer } from './components/my-formily/reactive-react';
import { FormItem, Input, Submit } from "./components/my-formily/antd";
// import {FormItem, Input, Submit} from "@formily/antd";
// import { Field, FieldContext, FormConsumer, FormProvider, useParentForm } from "@formily/react";
// import { observer } from "@formily/reactive-react";
import { Field, FieldContext, FormConsumer, FormProvider, useParentForm } from "./components/my-formily/react";

console.info(observer)
export {
    createForm,
    // react
    FormProvider,
    Field,
    FormConsumer,
    FieldContext,
    // 用于读取最近的 Form 或者 ObjectField 实例，主要方便于调用子表单的 submit/validate
    useParentForm,
    // reactive-react
    observer,
    // antd
    FormItem,
    Input,
    Submit,
    observable,
    Tracker,
};


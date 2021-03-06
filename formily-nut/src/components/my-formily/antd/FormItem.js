import { FieldContext, observer } from '@/which';
import React, { useContext } from 'react';

console.info(observer)

const FormItem = observer(({children}) => {
    const field = useContext(FieldContext)
   
    return (
        <div>
            <div>{field.title}</div>
            {children}
            <div className='red'>{field.selfErrors.join(',')}</div>
        </div>
    );
})

export default FormItem

import React, {useContext} from 'react'
import {useParentForm} from '@/which';

const Submit = ({children, onSubmit, onSubmitSuccess, onSubmitFailed, onClick}) => {
    const form = useParentForm();

    const buttonClick = (e) => {
        if(onClick){
            if(onClick(e) === false){
                return;
            }
        }
        if(onSubmit){
            form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed)
        }
    }

    return (
        <button onClick={buttonClick} >
        {children}
    </button>
    )
}

export default Submit


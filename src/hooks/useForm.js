import { useEffect, useMemo, useState } from "react"

 

export const useForm = (initialForm = {},formValidations = {}) => {
    const [formState, setformState] = useState(initialForm)
    const [formValidation,setFormValidation] = useState({})
    
    useEffect(()=>{
        createValidators()
    },[formState])

    useEffect(()=>{
        setformState(initialForm)
    },[initialForm])
    const isFormValid = useMemo(()=>{
        for(const formValue of Object.keys(formValidation)){
            if(formValidation[formValue] !== null) return false
        }
        return true
    },[formValidation])
    const onInputChange = (e) =>{
        setformState({
            ...formState,
            [e.target.name]: e.target.value,
        })
    }
    const onResetForm = () =>{
        setformState(initialForm)
    }

    const createValidators = () =>{
        const formCheckValues = {}

        for (const formField of Object.keys(formValidations)){
 
            const [fn,errorMessage = "Este campo es requerido"] = formValidations[formField]

            formCheckValues[`${formField}Valid`] =fn(formState[formField]) ? null : errorMessage
        }
        setFormValidation(formCheckValues)
    } 
    return{
        ...formState,
        formState, 
        onInputChange,
        onResetForm,
        isFormValid,
        ...formValidation
    }
}
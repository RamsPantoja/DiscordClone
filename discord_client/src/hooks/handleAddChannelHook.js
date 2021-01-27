import { useCallback, useEffect, useState } from 'react';


export const stateSchemaChannelName = {
    channelName: { value:''}
}

export const disableSchema = {
    status: true,
    error: ''
}

export const validationSchema = {
    channelName: {
        required: true
    }
}

const useAddChannelValidation = (stateSchema, validationSchema = {}, disableSchema) => {
    const [state, setState] = useState(stateSchema);
    const [disable, setDisable] = useState(disableSchema);
    const [isDirty, setIsDirty] = useState(false)

    const validationState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema).some( key => {
            const isInputRequired = validationSchema[key].required;
            const stateValue = state[key].value;
            const stateError = state[key].error;

            return ( isInputRequired && !stateValue ) || stateError
        })

        return hasErrorInState;
    }, [validationSchema, state])


    useEffect(() => {
        setDisable(() => ({
            ...disableSchema,
            status: true
        }))
    }, [disableSchema])

    useEffect(() => {
        if(isDirty) {
            setDisable(() => ({
                ...disableSchema,
                status: validationState()
            }))
        }

        if(validationState()) {
            setDisable(() => ({
                ...disableSchema,
                error: 'Campo obligatorio'
            }))
        }
    },[disableSchema, isDirty, validationState])

    const handleInput = useCallback((e) => {
        setIsDirty(true);
        const value = e.target.value;
        const name = e.target.name;

        setState((prevState) => ({
            ...prevState,
            [name]: { value }
        }))
    },[])

    return [state, disable, handleInput];
}

export default useAddChannelValidation;
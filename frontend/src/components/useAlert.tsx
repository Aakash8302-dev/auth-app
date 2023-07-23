import {useState, ChangeEvent} from 'react'
import { IAlert, IPasswordReset, IUserCreate } from '../types'

const useAlert = () => {

    const [info, setInfo] = useState<IAlert>({
        severity: undefined,
        message: "",
        open: false,
    })
    return {
        info,
        setInfo,
        open
    }
}

const useForm = (initialValues:IPasswordReset | IUserCreate) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(initialValues)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name ,value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange
    }

}

export {useAlert, useForm}
'use client'
import { FieldErrors, useForm } from "react-hook-form"
import styles from './formCLient.module.css'
import Title from "./Title"
import { useRouter } from "next/navigation"
import { FormData, IFormClient } from "@/app/Interface"
import useCustomFormValidation from "@/hooks/useValidationForm"
import useClientForm from "@/hooks/useClientForm"

const FormClient: React.FC<IFormClient> = ({ title, nameButton }) => {
    const router = useRouter()
    const  { postData, putData } = useClientForm()
    const { validateFieldLetters, validateBirthDate, validateFieldEmail } = useCustomFormValidation();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async({ name, surname, mothersSurname, email, birthdate }) => {
        validateFieldLetters(name, 'name')
        validateFieldLetters(surname, 'surname')
        validateFieldEmail(email)
        validateBirthDate(birthdate)

        if (title.toLocaleLowerCase() === 'register') {
            await postData({ name, surname, mothersSurname, email, birthdate });
        } else if (title.toLocaleLowerCase() === 'update') {
            await putData(20, { name, surname, mothersSurname, email, birthdate });
        }

        router.push('/');

    })

    const renderErrorMessage = (fieldName: keyof FieldErrors<FormData>) => {
        const error = errors[fieldName]
        return error && (
            <span style={{ color: "#ee2a2a", fontSize: '12px', fontWeight: '600' }}>
                {error.type === "required" && `This ${fieldName} field is required`}
                {error.type === "minLength" && `This ${fieldName} field has a minimum number of characters`}
                {error.type === "birthdateValidation" && "The date must be 18 years ago or earlier"}
                {error.type === "pattern" && `${fieldName} must contain only letters`}
                {error.type === "patternEmail" && "Invalid email format"}
            </span>
        );
    }


    return (
        <>
            <Title title={title} />
            <form onSubmit={onSubmit} className={styles.container_form} >
                <label className={styles.form_label}>Name{' '}
                    <input {...register("name", { required: true, minLength: 2 })} className={styles.form_input__text} />
                </label>
                {renderErrorMessage("name")}

                <label className={styles.form_label}>Surname{' '}
                    <input {...register("surname", { required: true, minLength: 2 })} className={styles.form_input__text} />
                </label>
                {renderErrorMessage("surname")}

                <label className={styles.form_label}>Mothers Surname{' '}(Optional)
                    <input {...register("mothersSurname")} className={styles.form_input__text} />
                </label>
                {renderErrorMessage("mothersSurname")}

                <label className={styles.form_label}>Email{' '}
                    <input {...register("email", { required: true, minLength: 6 })} className={styles.form_input__text} />
                </label>
                {renderErrorMessage("email")}

                <label className={styles.form_label}>Birthdate{' '}
                    <input {...register("birthdate", { required: true })} type="date" className={styles.form_input__text} />
                </label>
                {renderErrorMessage("birthdate")}

                <div className={styles.form_acctions}>
                    <input type="submit" className={styles.form_input__submit} value={nameButton} />
                    <button type="button" className={styles.form_button__cancelar} onClick={() => router.push('/')}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

export default FormClient

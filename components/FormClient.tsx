'use client'
import { useForm } from "react-hook-form";
import styles from './formCLient.module.css'
import Title from "./Title";
import { useRouter } from "next/navigation";

type FormData = {
    name: string;
    surname: string;
    mothersSurname: string;
    email: string;
    birthdate: Date
};

const FormClient = () => {
    const titleRegisterClient = 'Register Client'
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();
    const onSubmit = handleSubmit(({ name, surname, mothersSurname, email, birthdate }) => {
        console.log(name, surname, mothersSurname, email, birthdate);
    });

    return (
        <>
            <Title title={titleRegisterClient} />
            <form onSubmit={onSubmit} className={styles.container_form}>
                <label className={styles.form_label}>Name</label>
                <input {...register("name")} className={styles.form_input__text} />
                <label className={styles.form_label}>Surname</label>
                <input {...register("surname")} className={styles.form_input__text} />
                <label className={styles.form_label}>Mothers Surname</label>
                <input {...register("mothersSurname")} className={styles.form_input__text} />
                <label className={styles.form_label}>Email</label>
                <input {...register("email")} className={styles.form_input__text} />
                <label className={styles.form_label}>Birthdate</label>
                <input {...register("birthdate")} type="date" className={styles.form_input__text} />
                <div className={styles.form_acctions}>
                    <input type="submit" className={styles.form_input__submit} />
                    <button type="button" className={styles.form_button__cancelar} onClick={() => router.push('/')}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

export default FormClient

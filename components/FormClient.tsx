"use client";
import styles from "@/components/formCLient.module.css";
import { useRouter, useParams } from "next/navigation";
import { FormData, IFormClient } from "@/app/Interface";
import useClientForm from "@/hooks/useClientForm";
import { useEffect } from "react";
import Title from "@/components/Title";
import { useFormik } from "formik";
import { IUpdateClientForm, initialValues, validationSchemaUpdateClient } from "@/forms/updateClient";
import { Button, ConfigProvider, Layout } from "antd";

const FormClient: React.FC<IFormClient> = ({ title, nameButton }) => {
    const router = useRouter();
    const params = useParams<{ id: string; item: string }>()
    const id = Number(params.id)
    const { postData, putData, getClientById } = useClientForm()
    const formik = useFormik<IUpdateClientForm>({
        initialValues,
        validationSchema: validationSchemaUpdateClient,
        onSubmit: (values) => {
            console.log("values al finalizar validaciones", values); //invoco al modal
            if (nameButton.toLocaleLowerCase() === 'register') {
                postData(values)
            } else if (nameButton.toLocaleLowerCase() === 'update' && id) {
                putData(id, values)
            }
        },
    });

    const { handleSubmit, setValues, values, errors } = formik;

    useEffect(() => {
        if (nameButton.toLocaleLowerCase() === 'update' && id) {
            getClientById(id).then((client: FormData | null) => {
                if (client) {
                    const { name, surname, mothersSurname, email, birthdate } = client
                    setValues({
                        name,
                        surname,
                        mothersSurname,
                        email,
                        birthdate
                    })
                }
            }).catch(error => {
                console.error('Error fetching client data:', error)
            })
        }
    }, [id])

    console.log({values});
    console.log({nameButton})
    
    return (
        <Layout className={styles.layout}>
            <Title title={title} />
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.container_form}>
                    <label className={styles.form_label}>
                        Name{" "}
                        <input
                            {...formik.getFieldProps("name")}
                            className={styles.form_input__text}
                        />
                    </label>
                    {errors.name && <p className={styles.form_text_error}>{errors.name}</p>}

                    <label className={styles.form_label}>
                        Surname{" "}
                        <input
                            {...formik.getFieldProps("surname")}
                            className={styles.form_input__text}
                        />
                    </label>
                    {errors.surname && <p className={styles.form_text_error}>{errors.surname}</p>}

                    <label className={styles.form_label}>
                        Mothers Surname (Optional){" "}
                        <input
                            {...formik.getFieldProps("mothersSurname")}
                            className={styles.form_input__text}
                        />
                    </label>
                    {errors.mothersSurname && <p className={styles.form_text_error}>{errors.mothersSurname}</p>}

                    <label className={styles.form_label}>
                        Email{" "}
                        <input
                            {...formik.getFieldProps("email")}
                            className={styles.form_input__text}
                        />
                    </label>
                    {errors.email && <p className={styles.form_text_error}>{errors.email}</p>}


                    <label className={styles.form_label}>
                        Birthdate{" "}
                        <input
                            {...formik.getFieldProps("birthdate")}
                            className={styles.form_input__text}
                            type="date"
                        />
                    </label>

                    <div className={styles.form_acctions}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultHoverBg: '#20602a',
                                        defaultHoverColor: 'white',
                                        defaultActiveBg:'#20602a',
                                        defaultActiveColor: 'white'
                                    },
                                },
                            }}
                        >
                            <Button type="default" htmlType="submit" className={styles.form_input__submit}>{nameButton}</Button>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultHoverBg: '#7e2d25',
                                        defaultHoverColor: 'white',
                                        defaultActiveBg:'#7e2d25',
                                        defaultActiveColor: 'white'
                                    },
                                },
                            }}
                        >
                            <Button type="default" onClick={() => router.push('/')} className={styles.form_button__cancelar}>Cancel</Button>
                        </ConfigProvider>

                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default FormClient;

import * as Yup from "yup";

export interface IUpdateClientForm {
  name: string;
  surname: string;
  mothersSurname?: string;
  email: string;
  birthdate: Date;
}

export const initialValues: IUpdateClientForm = {
  name: "",
  surname: "",
  mothersSurname: "",
  email: "",
  birthdate: new Date(),
};

export const validationSchemaUpdateClient = Yup.object({
  name: Yup.string().required("Campo es requerido"),
  surname: Yup.string().required("Campo es requerido"),
  motherSurname: Yup.string(),
  email: Yup.string()
    .required("Campo es requerido")
    .email("Ingresa formato de email"),
  birthdate: Yup.date().required("Campo es requerido"),
});

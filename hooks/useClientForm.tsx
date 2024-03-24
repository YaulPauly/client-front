import { FormData } from "@/app/Interface";

const useClientForm = () => {

  const postData = async (formData: FormData) => {
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Error al registrar el cliente');
      }

      // Aquí puedes manejar la respuesta si es necesario
    } catch (error) {
      
    }
  };

  const putData = async (clientId: number, formData: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }

      // Aquí puedes manejar la respuesta si es necesario
    } catch (error) {

    }
  };

  return { postData, putData};
};

export default useClientForm;

import { FormData } from "@/app/Interface";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const useClientForm = () => {
  const router = useRouter()
  const getClientById = async (id: number) => {
    const fields = ['name', 'surname', 'mothersSurname', 'email', 'birthdate']
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}?fields=${fields.join(',')}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch client data');
      }

      const client = await response.json();
      return client;
    } catch (error) {
      console.error('Error fetching client data:', error);
      return null;
    }
  }

  const postData = async (formData: FormData) => {
    let messageError: string = ''
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
        response.text().then(text => {
          const result = JSON.parse(text)
          messageError = result.errors[0].message
          Swal.fire({
            title: "Error Validation!",
            text: messageError,
            icon: "error"
          });
          throw new Error()
        });
      } else {
        Swal.fire({
          title: "Register!",
          text: "The client has been register.",
          icon: "success"
        });
        router.push('/')
      }
    } catch (error) {
      console.log({ error });
      throw new Error()
    }
  };

  const putData = async (clientId: number, formData: FormData) => {
    let messageError: string = ''
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    });
    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          response.text().then(text => {
            const result = JSON.parse(text)
            messageError = result.errors[0].message
            Swal.fire({
              title: "Error Validation!",
              text: messageError,
              icon: "error"
            });
            throw new Error()
          });
        } else {
          Swal.fire({
            title: "Updated!",
            text: "The client has been updated.",
            icon: "success"
          });
          router.push('/')
        }
      } catch (error) {
        console.log({ error });
        throw new Error()
      }
    }
  }

  return { postData, putData, getClientById };
};

export default useClientForm;

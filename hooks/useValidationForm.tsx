import { FieldName, FormData } from "@/app/Interface";
import { useForm } from "react-hook-form";


const useCustomFormValidation = () => {
    const {
        setError,
    } = useForm<FormData>();

    const validateFieldLetters = (value: string, fieldName: FieldName) => {
        const nameRegex = /^[A-Za-z]+$/;
        if (!RegExp(nameRegex).test(value)) {
            setError(fieldName, {
                type: "pattern",
                message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must contain only letters`
            });
        }
    }

    const validateFieldEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!RegExp(emailRegex).exec(value)) {
            setError("email", {
                type: "patternEmail",
                message: "Invalid email format"
            });
        }
    }

    const validateBirthDate = (birthdate: Date) => {
        const dateOfBirth = new Date(birthdate);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        if (dateOfBirth >= eighteenYearsAgo) {
            setError('birthdate', {
                type: "birthdateValidation",
            });
        }
    }

    return { validateFieldLetters, validateBirthDate, validateFieldEmail };
}

export default useCustomFormValidation
import { GetProp, TableProps } from "antd"

export type ColumnsType<T> = TableProps<T>['columns']
export type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>
export type FieldName = "name" | "surname" | "mothersSurname"

export interface FormData {
    name: string
    surname: string
    mothersSurname?: string
    email: string
    birthdate: Date
};

export interface IFormClient {
    title: string
    nameButton: string
}

export interface DataType {
    id: number
    full_name: string
    age: number;
    birthdate: string
}

export interface TableParams {
    pagination?: TablePaginationConfig;
}

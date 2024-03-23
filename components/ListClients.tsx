'use client'
import { Button, ConfigProvider, GetProp, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import qs from 'qs';
import styles from './listClients.module.css'
import { redirect, useRouter } from "next/navigation";

type ColumnsType<T> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface DataType {
    id: number
    full_name: string
    age: number;
    birthdate: string
}

interface TableParams {
    pagination?: TablePaginationConfig;
}


const getRandomuserParams = (params: TableParams) => ({
    page: params.pagination?.current,
    per_page: params.pagination?.pageSize,
});

const ListClients = () => {
    const router = useRouter()
    const [data, setData] = useState<DataType[]>();
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [total, setTotal] = useState(0);

    let id: number

    const fetchData = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/clients?${qs.stringify(
                getRandomuserParams(tableParams)
            )}`
        )

        if (response.status !== 200) {
            throw new Error("Cannot fetch data. Response status is not 200.");
        }

        const data = await response.json();
        console.log("dataID:", data.id);
        

        setData(data.data.map((client: DataType, dataIndex: number) => ({
            key: dataIndex,
            ...client
        })))
        setTotal(data.total)
    };

    useEffect(() => {
        fetchData();
    }, [tableParams]);

    const handleTableChange: TableProps['onChange'] = (
        pagination,
    ) => {
        setTableParams({
            pagination,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            width: '40%',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: '10%',
        },
        {
            title: 'Birthdate',
            dataIndex: 'birthdate',
            width: '20%',
        },
        {
            title: '',
            dataIndex: 'update',
            render: () => {
                return (
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultBorderColor: "#FFD300",
                                    defaultColor: "#FFD300",
                                    defaultHoverBorderColor: "black",
                                    defaultHoverColor: "black"
    
                                },
                            },
                        }}
                    >
                        <Button type="default" onClick={() => router.push(`/update-client/${id}`)}>Update</Button>
                    </ConfigProvider>)
            },
        },
        {
            title: '',
            dataIndex: 'delete',
            render: () => {
                return (
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
    
                                },
                            },
                        }}
                    >
                        <Button type="primary" danger>Delete</Button>
                    </ConfigProvider>)
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ total, ...tableParams.pagination }}
            onChange={handleTableChange}
            className={styles.table_clients}
        />
    );
}

export default ListClients;
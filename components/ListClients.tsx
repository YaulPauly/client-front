'use client'
import { Button, ConfigProvider, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import qs from 'qs';
import styles from './listClients.module.css'
import { useRouter } from "next/navigation"
import { ColumnsType, DataType, TableParams } from "@/app/Interface"
import Swal from "sweetalert2";


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

        setData(data.data.map((client: DataType, dataIndex: number) => ({
            key: dataIndex,
            ...client,
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

    const showDeleteConfirmationModal = async (id : number)  => {
        const confirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log({response});
                
                if (!response.ok) {
                    throw new Error("Failed to delete client.");
                }
    
                Swal.fire({
                    title: "Deleted!",
                    text: "The client has been deleted.",
                    icon: "success"
                });
    
                fetchData();
            } catch (error) {
                console.error("Error deleting client:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete the client. Please try again later.",
                    icon: "error"
                });
            }
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
            render: (_, record) => {
                const {id} = record
                return (
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultHoverBg: "#e1b635",
                                    defaultHoverBorderColor: "#e1b635",
                                    defaultHoverColor: 'white',
                                    defaultActiveBg:'#e1b635',
                                    defaultActiveBorderColor: '#e1b635',
                                    defaultActiveColor: 'white'
                                },
                            },
                        }}
                    >
                        <Button type="default" onClick={() => router.push(`/update-client/${id}`)} className={styles.table_button__update}>Update</Button>
                    </ConfigProvider>)
            },
        },
        {
            title: '',
            dataIndex: 'delete',
            render: (_, record) => {
                const {id} = record
                return (
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
    
                                },
                            },
                        }}
                    >
                        <Button type="primary" danger onClick={() => showDeleteConfirmationModal(id)}>Delete</Button>
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
            scroll={{ x: 400 }}
        />
    );
}

export default ListClients;
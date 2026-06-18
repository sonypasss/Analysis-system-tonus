import { useEffect, useState } from "react";
import api from "../api/api";
import { Table } from "antd";

import MainLayout from "../layouts/MainLayout";

function Sales() {
    const [sales, setSales] = useState([]);
    useEffect(() => {
        loadSales();
    }, []);

    async function loadSales() {
        const response = await api.get("/sales");
        setSales(response.data);
    }

    const columns = [
        {
            title: "Дата",
            render: row => row.saleDate ?.slice(0, 10)
        },

        {
            title: "Клиент",
            render: row => row.Client ?.name
        },

        {
            title: "Сумма",
            render: row => `${row.totalAmount} ₽`
        }

    ];

    return (
        <MainLayout>
            <h1 style={{marginBottom:30}}>Клиенты</h1>
        <Table
            rowKey="id"
            dataSource={sales}
            columns={columns}
            bordered
            pagination={{pageSize: 10}}
            style={{
                background:"white",
                borderRadius:14
            }}
        />

        </MainLayout>

    );

}

export default Sales;
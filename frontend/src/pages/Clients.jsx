import { useEffect, useState } from "react";
import api from "../api/api";;
import { Table } from "antd";

import MainLayout from "../layouts/MainLayout";

function Clients() {

  const [clients, setClients] = useState([]);
  
    useEffect(() => {
        loadClients(); 
    }, []);

  async function loadClients() {

    const response = await api.get("/clients");;

    setClients(response.data);

  }

  const columns = [

    {
      title: "Название",

      dataIndex:
        "name"
    },

    {
      title: "ИНН",

      dataIndex:
        "inn"
    },

    {
      title: "Регион",

      dataIndex:
        "region"
    },

    {
      title: "Сегмент",

      dataIndex:
        "segment"
    }

  ];

  return (

    <MainLayout>
      <h1 style={{marginBottom:30}}>Клиенты</h1>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={clients}
        bordered
        pagination={{
            pageSize: 10
        }}
        style={{
            background: "white",
            borderRadius: 14
        }}
      />

    </MainLayout>

  );

}

export default Clients;
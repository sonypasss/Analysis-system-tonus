import { useEffect, useState } from "react";
import api from "../api/api";
import { Table, Input } from "antd";

import MainLayout from "../layouts/MainLayout";

function Products() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

  async function loadProducts(value = "") {

    const url = value ? `/products/search?name=${value}` : "/products";

    const response = await api.get(url);
    
    setProducts(
      response.data
    );

  }

  const columns = [

    {
      title: "Артикул",
      dataIndex: "article"
    },

    {
      title: "Название",
      dataIndex: "name"
    },

    {
      title: "Категория",
      dataIndex: "productGroup"
    },

    {
      title: "Цена",

      render: row =>
        `${row.price} ₽`
    },

    {
      title: "Остаток",

      dataIndex:
        "stockQuantity"
    }

  ];

  return (

    <MainLayout>
      <h1 style={{marginBottom:30}}>Клиенты</h1>
      <Input
        placeholder="Поиск товара"

        value={search}

        onChange={(e) => {

          setSearch(
            e.target.value
          );

          loadProducts(
            e.target.value
          );

        }}

        style={{
          marginBottom: 20
        }}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        bordered
        pagination={{pageSize: 10}}
        style={{
            background:"white",
            borderRadius:14
        }}
        locale={{emptyText: "Товар не найден"}}
      />

    </MainLayout>

  );

}

export default Products;
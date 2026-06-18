import { Table } from "antd";

function TopClients({ data }) {

  const columns = [

    {
      title: "Клиент",
      dataIndex: "name"
    },

    {
      title: "Выручка",

      render: (_, row) =>
        `${Number(row.revenue)} ₽`
    }

  ];

  return (

    <Table
      columns={columns}
      dataSource={data}
      rowKey="name"
      pagination={false}
    />

  );

}

export default TopClients;
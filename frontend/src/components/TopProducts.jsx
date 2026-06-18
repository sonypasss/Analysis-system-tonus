import { Table } from "antd";

function TopProducts({ data }) {
    const columns = [
        {
            title: "Товар",
            dataIndex: "name"
        },
        {
            title: "Продано",
            dataIndex: "quantity"
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

export default TopProducts;
import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { getPizzas } from '../services/pizzas';

const confirm = (id) => {
    console.log("Deleting pizza: ", id);
    message.success('Deleting pizza...');
};

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Image',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (text, record) => <img style={imageStyles} src={text} alt={record.name} />
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <span>{text}$</span>
    },
    {
        title: 'Pizza Size',
        dataIndex: 'pizzaSizeDiametr',
        key: 'pizzaSizeDiametr'
    },
    {
        title: 'Cooking Time',
        dataIndex: 'cookingTimeMin',
        key: 'cookingTimeMin',
        render: (text) => <span>{text}m</span>
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href='/'>Show</a>
                <Popconfirm
                    title="Delete this pizza?"
                    description={`Are you sure to delete ${record.title}?`}
                    onConfirm={() => confirm(record.id)}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                     <Button danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            </Space>
        ),
    },
];

export default function Products() {

    const [pizzas, setPizzas] = useState([]);

    const loadPizzas = async () => {
        //const response = await fetch(api);
        //const data = await response.json();

        const response = await getPizzas();
        setPizzas(response.data);
    }

    useEffect(() => {
        loadPizzas();
    }, []);

    return (
        <>
            <Space>
                <Button style={{ marginBottom: 10 }} type="primary">
                    <Link to="create">Create New Pizza</Link>
                </Button>
                <Button style={{ marginBottom: 10 }} type="primary">
                    <Link to="edit">Test Edit</Link>
                </Button>
            </Space>
            <Table columns={columns} dataSource={pizzas} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
}

const imageStyles = {
    width: 55,
    height: 55,
    objectFit: "cover",
    borderRadius: 6
}
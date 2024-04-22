import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Rate, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const makeFirstUpper = (text) => {
    return text[0].toUpperCase() + text.slice(1);
}

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
        render: (text) => <img style={imageStyles} src={text} alt='Pizza Image' />
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
        key: 'pizzaSizeDiametr',
        render: (text) => <span>{makeFirstUpper(text)}</span>
    },
    {
        title: 'Cooking Time',
        dataIndex: 'cookingTimeMin',
        key: 'cookingTimeMin',
        render: (text) => <Rate allowHalf disabled defaultValue={text} />
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Show</a>
                <Popconfirm
                    title="Delete the pizza"
                    description="Are you sure to delete this pizza?"
                    onConfirm={() => confirm(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </Space>
        ),
    },
];

const api = "https://localhost:7283/api/Pizza/all";

export default function Products() {

    const [pizzas, setPizzas] = useState([]);

    const loadPizzas = async () => {
        const response = await fetch(api);
        const data = await response.json();
        console.log(response);
        console.log(data);

        setPizzas(data.pizzas);
    }

    useEffect(() => {
        loadPizzas();
    }, []);

    return (
        <>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">Create New Pizza</Link>
            </Button>
            <Table columns={columns} dataSource={pizzas} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
}

const imageStyles = {
    width: 100,
    height: 50,
    objectFit: "cover",
    borderRadius: 6
}
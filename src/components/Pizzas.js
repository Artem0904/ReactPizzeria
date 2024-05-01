import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { pizzasService } from '../server/pizzas';


function getColumns(deleteHandler) {
    return [
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
            key: 'name',
            render: (text) => <a href='/'>{text}</a>
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
                        title="Delete the pizza"
                        description={`Are you sure to delete ${record.title}?`}
                        onConfirm={() => deleteHandler(record.id)}
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
}

export default function Products() {

    const [pizzas, setPizzas] = useState([]);

    const loadPizzas = async () => {
        const response = await pizzasService.get();
        const items = response.data;

        setPizzas(response.data);
    }

    const deletePizza = async (id) => {
        console.log("Deleting pizza: ", id);

        const res = await pizzasService.delete(id);

        if (res.status == 200) {
            setPizzas(pizzas.filter(x => x.id != id));
            message.success('Pizza deleted successfully!');
        }
    };

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
            <Table columns={getColumns(deletePizza)} dataSource={pizzas} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
}

const imageStyles = {
    width: 55,
    height: 55,
    objectFit: "cover",
    borderRadius: 6
}
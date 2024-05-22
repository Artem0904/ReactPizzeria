import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select, Space, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { pizzasService } from '../server/pizzas';
import { useNavigate, useParams } from 'react-router-dom';

let pizza = null;
export default function CreateForm() {

    const [pizzaSizes, setPizzaSizes] = useState([]);
    const [form] = Form.useForm();
    const params = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    const loadPizzaSizes = async () => {
        const response = await pizzasService.getPizzaSizes();

        // change property names: id -> value, name -> label
        const mapped = response.data.map(function (x) { return { value: x.id, label: x.diametr } });
        setPizzaSizes(mapped);
    }

    useEffect(() => {
        loadPizzaSizes();
        loadInitialPizza();
        if (pizza) {
            form.setFieldsValue(pizza);
        }
    }, [pizza, form]);

    const onFinish = async (values) => {
        console.log(values);    

        const response = await pizzasService.create(values);

        if (editMode) {
            values.id = pizza.id;
            console.log(values.id);
            values.imageUrl = pizza.imageUrl;

            const res = await pizzasService.edit(values);

            if (res.status === 200) {
                message.success("Pizza edited successfully!");
            }
        }
        else {
            values.image = values.image.originFileObj;
            // send to server
            const res = await pizzasService.create(values);

            if (res.status === 200) {
                message.success("Pizza created successfully!");
            }
        }

        navigate(-1);
    };
    const onReset = () => {
        form.resetFields();
    };

    const loadInitialPizza = async () => {
        if (params.id) {
            setEditMode(true);

            const res = await pizzasService.getById(params.id);
            if (res.status !== 200) return; // todo: throw exception

            pizza = res.data;
            form.setFieldsValue(res.data);
        }
    };

    // const normFile = (e) => {
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e?.file;
    // };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>{editMode ? 'Edit' : 'Create'} Pizza</h1>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    margin: "auto"
                }}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter pizza name" />
                </Form.Item>

                <div style={col2}>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="$"
                            placeholder="Enter pizza price"
                        />
                    </Form.Item>

                    <Form.Item
                        name="cookingTimeMin"
                        label="Cooking Time"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="m"
                            placeholder="Enter Cooking Time"
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="pizzaSizeId"
                    label="Pizza size"
                    initialValue={1}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a pizza size"
                        options={pizzaSizes}>
                    </Select>
                </Form.Item>

                {/* <Form.Item
                    name="imageUrl"
                    label="Image"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Choose a File</Button>
                    </Upload>
                </Form.Item> */}
                <Form.Item
                    name="imageUrl"
                    label="Image"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter pizza image url" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <TextArea rows={4}
                        placeholder="Enter pizza description"
                        minLength={10} maxLength={3000} showCount />
                </Form.Item>

                <Form.Item style={{
                    textAlign: "center"
                }}>

                    <Space>
                        <Button type="primary" htmlType="submit">
                            {editMode ? "Edit" : "Create"}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

const col2 = {
    display: "flex",
    gap: 10
}
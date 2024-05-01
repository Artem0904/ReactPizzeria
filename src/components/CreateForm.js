import React, { useEffect } from 'react';
import { Button,  Form, Input, InputNumber, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const pizzaSizes = [
    { value: 1, label: "15" },
    { value: 2, label: "30" },
    { value: 3, label: "50" },
]

export default function CreateForm({ pizza }) {

    const [form] = Form.useForm();

    useEffect(() => {
        if (pizza) {
            form.setFieldsValue(pizza);
        }
    }, [pizza, form]);

    const onFinish = (values) => {
        console.log(values);    

        //

    };
    const onReset = () => {
        form.resetFields();
    };
    // const normFile = (e) => {
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e?.file;
    // };

    return (
        <>
            <h1>Create New Pizza</h1>
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
                        options={pizzaSizes}
                    >
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
                            Create
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
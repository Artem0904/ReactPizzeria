import React, { useContext, useEffect, useState } from 'react'
import { Layout as AntdLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, ProductOutlined, UnorderedListOutlined, LoginOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = AntdLayout;

export default function Header() {
    
    let location = useLocation();

    const [current, setCurrent] = useState(location.pathname);

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);


    return (
        <AntdHeader
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[current]}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <Menu.Item key="/">
                    <HomeOutlined />
                    <span>Home</span>
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="/pizzas">
                    <ProductOutlined />
                    <span>Pizzas</span>
                    <Link to="/pizzas" />
                </Menu.Item>
                <Menu.Item key="/beverages">
                    <UnorderedListOutlined />
                    <span>Beverages</span>
                    <Link to="/beverages" />
                </Menu.Item>
                <Menu.Item key="/about">
                    <InfoCircleOutlined />
                    <span>About</span>
                    <Link to="/about" />
                </Menu.Item>
                <Menu.Item key="/login">
                    <LoginOutlined />
                    <Link to="/login">Login</Link>
                </Menu.Item>
                
            </Menu>
        </AntdHeader>
    )
}
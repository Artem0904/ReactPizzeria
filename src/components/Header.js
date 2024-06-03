import React, { useContext, useEffect, useState } from 'react'
import { Layout as AntdLayout, Menu, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, ProductOutlined, UnorderedListOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { AccountsContext } from '../contexts/account.context';
import { accountsService } from '../server/accounts';

const { Header: AntdHeader } = AntdLayout;

export default function Header() {
    
    const { email, isAuth, logout } = useContext(AccountsContext);
    let location = useLocation();

    const [current, setCurrent] = useState(location.pathname);

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    const onLogout = () => {
        accountsService.logout();
        logout();
    }


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
            </Menu>

            {
                isAuth
                    ?
                    <Space>
                        <span style={{ color: "white" }}>Hello, {email}</span>
                        <Link onClick={onLogout} style={{ color: "white" }}><LogoutOutlined /></Link>
                        {console.log(`hello, ${email}`)}
                    </Space>
                    :
                    <Link to="/login" style={{ color: "white" }}>
                        {console.log(`aaaaaaaaaa, ${email}`)}
                        <Space size="small">
                            <LogoutOutlined />
                            <span>Login</span>
                        </Space>
                    </Link>
            }
        </AntdHeader>
    )
}
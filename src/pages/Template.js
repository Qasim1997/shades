import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { Input } from 'antd';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;
const { Search } = Input;
export const Wrapper = styled.div`
  
`;
const Template = (props) => {
    const onSearch = (value) => console.log(value);

    const [collapsed, setCollapsed] = useState(false);
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }
    return (


        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to='/user'>User</Link>,
                        },
                        getItem('User', 'sub1', <UserOutlined />, [
                            getItem('Tom', '3'),
                            getItem('Bill', '4'),
                            getItem('Alex', '5'),
                          ]),
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <Link to='/serviceProvider'>Service Provider</Link>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: 'nav 4',
                        }, {
                            key: '5',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        }, {
                            key: '6',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                         {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                        {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },  {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },  {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },  {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },  {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },  {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },  {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        }, 
                        
                        
                      

                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,

                    }}

                >
                    <div style={{ 'display': 'flex', 'marginTop': 'auto' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                            style={{
                                width: 200,
                                'marginTop':'18px',
                            }}
                        />
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Template;
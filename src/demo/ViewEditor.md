## ViewEditor

You can import to your app with default export.

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ViewEditor } from 'antd-gui';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

export default () => {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <ViewEditor title="edit" onClick={() => window.alert('eidt')}>
            {({ ref }) => (
              <div ref={ref} className="site-layout-content">
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
              </div>
            )}
          </ViewEditor>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      <style>{`
        .site-layout-content {
          min-height: 280px;
          padding: 24px;
          background: #fff;
          font-family: sans-serif;
          text-align: center;
        }
        #components-layout-demo-top .logo {
          float: left;
          width: 120px;
          height: 31px;
          margin: 16px 24px 16px 0;
          background: rgba(255, 255, 255, 0.3);
        }
        .ant-row-rtl #components-layout-demo-top .logo {
          float: right;
          margin: 16px 0 16px 24px;
        }
      `}</style>
    </>
  );
};
```

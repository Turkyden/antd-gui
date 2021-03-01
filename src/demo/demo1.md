## Darkreader

You can import to your app with default export.

```tsx
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import ViewEditor from 'ant-design-gui';
import { useControls } from 'leva';
import 'antd/dist/antd.css';
import './styles.css';

const { Header, Content, Footer } = Layout;

export default () => {
  const { name, aNumber } = useControls({ name: 'World', aNumber: 0 });

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
                <div>
                  Hey {name}, hello! {aNumber}
                </div>
              </div>
            )}
          </ViewEditor>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      <style>{`
        .viewEditor {
          position: fixed;
          pointer-events: none;
        }

        .viewEditor-title {
          position: fixed;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 0 1rem;
          pointer-events: all;
          cursor: pointer;
          user-select: none;
        }

        .viewEditor-title:hover {
          background-color: rgba(47, 84, 235, 0.8);
        }
      `}</style>
    </>
  );
};
```

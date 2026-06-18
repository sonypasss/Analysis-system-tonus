import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider, Content} = Layout;

function MainLayout({
  children
}) {

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}
    >

      <Sider>
        <div
          style={{
            color: "white",
            padding: 20,
            fontSize: 22,
            fontWeight: 700,
            textAlign: "center"
          }}
        >
          TONUS SALES
        </div>

        <Menu 
          theme="dark" selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/",
              label: "Аналитика"
            },

            {
              key: "/sales",
              label: "Продажи"
            },

            {
              key: "/products",
              label: "Товары"
            },

            {
              key: "/clients",
              label: "Клиенты"
            }

          ]}

        />

      </Sider>

      <Layout>
         <Content
            style={{
              padding: 30,
              background: "#f5f7fa",
              minHeight: "100vh"
            }}
         >

          {children}

        </Content>

      </Layout>

    </Layout>

  );

}

export default MainLayout;
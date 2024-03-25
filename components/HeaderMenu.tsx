'use client'
import { Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import { useRouter } from "next/navigation";

const HeaderMenu = () => {
  const router = useRouter();

  const handleMenuClick = (key: string) => {
    if (key === "1") {
      router.push("/");
    } else if (key === "2") {
      router.push("/register-client");
    }
  };
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        onClick={({ key }) => handleMenuClick(key)}
        items={[{ key: 1, label: 'Home' }, { key: 2, label: 'Register Client' }]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  )
}

export default HeaderMenu

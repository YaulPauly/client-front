'use client'
import ListClients from "@/components/ListClients";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import { Button, ConfigProvider, Layout } from "antd";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";

export default function Home() {
  const router = useRouter()
  const titleListClients = 'List Clients'
  return (
    <div className={styles.container}>
      <Carousel />
      <div className={styles.container_list__Client}>
        <Layout className={styles.container_layout}>
          <Title title={titleListClients} />
          <div className={styles.container_layout_list_clients}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultHoverBg: '#1a9b2e',
                    defaultHoverColor: 'white',
                    defaultHoverBorderColor: '#28a745',
                    defaultActiveBg: '#1a9b2e',
                    defaultActiveBorderColor: '#1a9b2e',
                    defaultActiveColor: 'white'
                  },
                },
              }}
            >
              <Button type="default" onClick={() => router.push('/register-client')} className={styles.list__Client_Button}>
                Add new Client
              </Button>
            </ConfigProvider>
            <ListClients />
          </div>
        </Layout>
      </div>
    </div>
  );
}

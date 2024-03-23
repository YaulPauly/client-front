'use client'
import ListClients from "@/components/ListClients";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";

export default function Home() {
  const router = useRouter()
  const titleListClients = 'List Clients'
  return (
    <div className={styles.container}>
      <Carousel />
      <div className={styles.container_list__Client}>
        <Title title={titleListClients} />
        <Button type="primary" onClick={() => router.push('/register-client')}>
          Add new Client
        </Button>
        <ListClients />
      </div>
    </div>
  );
}

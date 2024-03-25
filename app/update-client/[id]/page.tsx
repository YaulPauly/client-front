import FormClient from "@/components/FormClient"
import styles from './page.module.css'

const UpdateClients = () => {
  const title = "Update Client"
  const buttonUpdate = "Update";

  return (
    <div className={styles.container_update}>
      <FormClient title={title} nameButton={buttonUpdate}/>
    </div>
  )
}

export default UpdateClients

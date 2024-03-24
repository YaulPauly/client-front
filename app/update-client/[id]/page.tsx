import FormClient from "@/components/FormClient"
import styles from './page.module.css'

const UpdateClients = () => {
  let title = "Update Client"
  let buttonUpdate = "UPDATE"
  return (
    <div className={styles.container_update}>
      <FormClient title={title} nameButton={buttonUpdate}/>
    </div>
  )
}

export default UpdateClients

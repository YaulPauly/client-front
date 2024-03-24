import FormClient from "@/components/FormClient"
import styles from './page.module.css'
const RegisterClient = () => {
  let title = "Register Client"
  let buttonUpdate = "REGISTER"
  return (
    <div className={styles.container_register}>
        <FormClient title={title} nameButton={buttonUpdate}/>
    </div>
  )
}

export default RegisterClient

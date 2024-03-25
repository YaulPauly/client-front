import FormClient from "@/components/FormClient"
import styles from './page.module.css'
const RegisterClient = () => {
  const title = "Register Client"
  const buttonUpdate = "Register"
  return (
    <div className={styles.container_register}>
        <FormClient title={title} nameButton={buttonUpdate}/>
    </div>
  )
}

export default RegisterClient

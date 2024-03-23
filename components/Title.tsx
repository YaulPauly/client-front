import styles from './title.module.css'

interface ITitle {
    title: string
}

const Title: React.FC<ITitle> = ({ title }) => {
    return (
        <h2 className={styles.title}>{title}</h2>
    )
}

export default Title

import styles from './pageLayout.module.css';

const Layout = ({ children }) => (
    <main className={styles.container}>
        { children }
    </main>
)
export default Layout;

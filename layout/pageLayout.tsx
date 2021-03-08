import styles from "./pageLayout.module.css";

const Layout = ({ children }) => (
  <main className={styles.container}>
    {children}
    <style jsx global>{`
      body {
        padding: 17px;
      }
      button {
        border: 1px solid grey;
      }
    `}</style>
  </main>
);
export default Layout;

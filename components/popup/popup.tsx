import styles from './popup.module.css';


const Popup = ({ children, hide, isVisible }) => (
    <>
        {isVisible && 
            <div className={styles.popup} onClick={hide}>
                <div className={styles.popupInner} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        }
    </>
);
export default Popup;

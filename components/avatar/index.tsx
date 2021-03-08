import styles from "./avatar.module.css";

interface AvatarProps {
  text: string;
}

const Avatar = ({ text }: AvatarProps) => (
  <div className={styles.avatar}>{text}</div>
);
export default Avatar;

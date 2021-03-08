import styles from "./search.module.css";

interface SearchProps {
  onChange: (filter: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
  return (
    <div>
      <input
        placeholder="Search..."
        className={styles.search}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default Search;

interface SearchProps {
    onChange: (filter: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
    return (
        <div>
            <input placeholder="Search..." onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}
export default Search;
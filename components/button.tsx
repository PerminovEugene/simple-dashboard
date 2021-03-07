interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button = ({ onClick, text }: ButtonProps) => (
    <button onClick={onClick}>{text}</button>
)

export default Button;
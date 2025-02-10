
const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="bg-white px-4 py-2 rounded-md">{children}</button>
  )
}

export default Button
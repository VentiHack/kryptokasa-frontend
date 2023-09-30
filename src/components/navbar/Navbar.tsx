import { Link } from "react-router-dom";
import "./navbar.scss";
const Navbar = () => {
  return (
    <nav className="navbar">
      <span>X</span>
      <div>
        <Link to="/">Home</Link>
        <Link to="/">Home 2</Link>
        <Link to="/">Home 3</Link>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Library Management System</h1>
      <p>This is the Home page.</p>
      <div>
        <Link to="/authors">Go to Authors List</Link>
      </div>
      <div>
        <Link to="/books">Go to Books List</Link>
      </div>
      <div>
        <Link to="/categories">Go to Category List</Link>
      </div>
    </div>
  );
}

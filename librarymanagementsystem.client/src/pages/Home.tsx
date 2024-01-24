import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Library Management System</h1>
      <p>This is the Home page.</p>
      <Link to="/authors">Go to Authors List</Link>
    </div>
  );
}

import { Link } from "react-router-dom"
function Error() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found!</h1>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default Error

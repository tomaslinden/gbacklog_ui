import { useState } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleFormSubmit = event => {
    event.preventDefault()
    event.stopPropagation()
    const trimmedSearchTerm = searchTerm.trim()
    window.location.href = `/search/${trimmedSearchTerm}`;
  }

  return (
    <>
      <nav className="navbar navbar-dark navbar-custom navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Gbacklog</a>
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/subjects">Review subjects&nbsp;&nbsp;&nbsp;</Link>
              </li>
              <li className="nav-item">
                <Link to="/frameworks">Review frameworks&nbsp;&nbsp;&nbsp;</Link>
              </li>
              <li className="nav-item">
                <Link to="/reviews">Reviews&nbsp;&nbsp;&nbsp;</Link>
              </li>
            </ul>
            <Form className="d-flex" role="search" onSubmit={handleFormSubmit}>
              <Form.Control as="input"
                type="search"
                placeholder="Search term"
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
              />
              <Button className="ms-2" variant="outline-light" type="submit">Search</Button>
            </Form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

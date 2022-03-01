const Navbar = () => {
  return (
    <nav>
      <div className="link-wrapper">
        <a href="#home">Home</a>
        <a href="#band">Band</a>
        <a href="#tour">Tour</a>
        <a href="contact.html">Contact</a>
      </div>
      <div className="search-wrapper">
        <i className="bi bi-search" />
      </div>
    </nav>
  )
}

export default Navbar;
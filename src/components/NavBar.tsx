import "../NavBar.css";

function NavBar() {
  let ListItems = ["Home", "Technologies", "Git Repository", "Contact"];

  //fragment
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="nav navbar-nav">
              {ListItems.map((item) => (
                <li key={item}>
                  <a className="nav-link" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

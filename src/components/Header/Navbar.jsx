import useDashborad from "../../hooks/useDashborad";
import { MenuToggle } from "./components/MenuToggle"

export const Navbar = () => {
  
  const {titleUrl} = useDashborad();

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">

            <MenuToggle />
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user me-2"></i>John Doe
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <h3 className="px-4">¡Bienvenido al moudulo de {titleUrl} !</h3>
    </>        
  )
}

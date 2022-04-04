import react, { Component } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import './css/Header.css';
import rainbowImage from '../ClientFolder/Images/rainbow.png';
import { Link, Redirect } from 'react-router-dom';
import addtocart from './Images/addtocart.png';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggdIn: false
        }
    }


    componentDidMount = () => {
        let token = sessionStorage.getItem("customerEmail");
        // console.log(token);
        if (token != null) {
            // console.log("call done")
            this.setState({ loggdIn: true });
        }

    }



    logoutFun = () => {
        this.setState({ loggdIn: false });

        sessionStorage.clear();
        localStorage.clear();
        return <Redirect to="/" />

    }


    render() {

        // if (this.state.loggdIn === false) {

        //     return <Redirect to="/" />
        // }


        return (
            <div className="headerNavBar">

                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" >
                    <Navbar.Brand href="#home"><img src={rainbowImage} className="logo" /></Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Nav>


                            <Nav.Link  > <Link to="/" style={{ color: "black", textDecoration: "none" }} >Home</Link> </Nav.Link>

                            {this.state.loggdIn ? (
                                <>
                                    <NavDropdown title="My Account" id="collasible-nav-dropdown" >
                                        <NavDropdown.Item ><Link to="/CustomerProfile" style={{ color: "black", textDecoration: "none" }} >My Profile</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item ><Link to="/MyOrders" style={{ color: "black", textDecoration: "none" }} >My Orders</Link></NavDropdown.Item>

                                    </NavDropdown>
                                    <Nav.Link className="linkcolor"><Link to="/CustomerCart" style={{ color: "black", textDecoration: "none" }} >Cart</Link></Nav.Link>
                                    <Nav.Link className="linkcolor"><Link to="/Logout" style={{ color: "black", textDecoration: "none" }} onClick={this.logoutFun}>Logout</Link></Nav.Link></>
                            )
                                :
                                (
                                    <>
                                        <Nav.Link ><Link to="/CustomerLogin" style={{ color: "black", textDecoration: "none" }}>Login</Link> </Nav.Link>
                                        <Nav.Link ><Link to="/CustomerRegistration" style={{ color: "black", textDecoration: "none" }}>Sign up</Link> </Nav.Link>
                                    </>
                                )
                            }
                            <Nav.Link className="linkcolor" ><Link to="/ContactUS" style={{ color: "black", textDecoration: "none" }}>Contact US</Link></Nav.Link>
                            <Nav.Link className="linkcolor" ><Link to="/AboutUS" style={{ color: "black", textDecoration: "none" }}>About US</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

}


export default Header;
import * as React from "react";
import { Link } from "react-router-dom";

// components
import { connect } from "react-redux";

interface IProps {
    user?: any;
    dispatch?: any;
}

export class Navbar extends React.Component<IProps> {
    public render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-default">
                    <a className="navbar-brand ml-4" href="/">SHOPMATE</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse ml-5" id="mainNavBar">
                        <div className="navbar-nav nav-item nav-link">
                            <Link to="/">
                                Women
                            </Link>
                        </div>
                        <div className="navbar-nav nav-item nav-link">
                            <Link to="/">
                                Men
                            </Link>
                        </div>
                        <div className="navbar-nav nav-item nav-link">
                            <Link to="/">
                                Kids
                            </Link>
                        </div>
                        <div className="navbar-nav nav-item nav-link">
                            <Link to="/">
                                Shoes
                            </Link>
                        </div>
                        <div className="navbar-nav nav-item nav-link">
                            <Link to="/">
                                Brands
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default connect()(Navbar);

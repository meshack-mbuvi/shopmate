import * as React from "react";
import { connect } from "react-redux";
import backround from "../static/img/background.jpg"

interface IProps {
    history?: any;
    user?: any;
    twits?: any;
    dispatch?: any;
}
export class Home extends React.Component<IProps> {

    public render() {
        return (
            <div className="container-fluid">
                <div className='row'><img src={backround} className="homeImg" /></div>
                <div className="row">
                    This is an e-commerce system which allows users to search, add items to their shopping cart, create order and checkout successfully.
                </div>

            </div>
        );
    }
}

export default connect(
    null
)(Home);

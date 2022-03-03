import {Component} from 'react';
import Blockies from 'react-blockies';

class Navbar extends Component {
    render() {
        return (
            <nav className="flex justify-between items-center max-w-4xl mx-auto px-4">
                <a href="/" title="Decentagram">
                    <h1 className="font-bold text-2xl py-4 text-center">DECENTAGRAM</h1>
                </a>
                <figure className="flex flex-row-reverse items-center">
                    <Blockies seed={this.props.account} className="rounded-full ml-4"/>
                    <figcaption className="font-semibold md:block hidden">{this.props.account}</figcaption>
                </figure>
            </nav>
        );
    }
}

export default Navbar;
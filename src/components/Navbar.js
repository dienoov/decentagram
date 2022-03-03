import {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <a href="/" title="Decentagram">
                    <h1 className="font-bold text-2xl py-4 text-center">DECENTAGRAM</h1>
                </a>
            </nav>
        );
    }
}

export default Navbar;
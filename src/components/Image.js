import {Component} from 'react';
import Blockies from 'react-blockies';

class Image extends Component {
    render() {
        return (
            <article className="rounded bg-zinc-800">
                <header className="p-4 flex items-center">
                    <Blockies seed={this.props.image.author} className="rounded-full mr-4"/>
                    <h2 className="truncate font-semibold">{this.props.image.author}</h2>
                </header>
                <figure>
                    <img src={`//ipfs.infura.io/ipfs/${this.props.image.hash}`} alt={this.props.image.hash}
                         width="512" height="512" className="w-full h-full object-cover"/>
                    <figcaption className="p-4">{this.props.image.description}</figcaption>
                </figure>
            </article>
        );
    }
}

export default Image;
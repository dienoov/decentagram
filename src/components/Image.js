import {Component} from 'react';
import Blockies from 'react-blockies';
import ethIcon from '../icons/eth-icon.svg';

class Image extends Component {
    render() {
        return (
            <article className="rounded bg-zinc-800 mb-4">
                <header className="p-4 flex items-center">
                    <Blockies seed={this.props.image.author} className="rounded-full mr-4"/>
                    <h2 className="truncate font-semibold">{this.props.image.author}</h2>
                </header>
                <figure>
                    <img src={`//ipfs.infura.io/ipfs/${this.props.image.hash}`} alt={this.props.image.hash}
                         width="543" height="543" className="w-full h-full object-cover bg-zinc-700"/>
                    <figcaption className="p-4">{this.props.image.description}</figcaption>
                </figure>
                <footer className="px-4 py-2 flex justify-between items-center border-t-2 border-zinc-900">
                    <span className="text-zinc-400">
                        {window.web3.utils.fromWei(this.props.image.tipAmount.toString(), 'ether')} ETH
                    </span>
                    <button className="font-semibold bg-zinc-200 hover:bg-zinc-100 p-1 rounded-full"
                            data-id={this.props.image.id} onClick={this.props.sendTip}>
                        <img src={ethIcon} alt="ethereum"/>
                    </button>
                </footer>
            </article>
        );
    }
}

export default Image;
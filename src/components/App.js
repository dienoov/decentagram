import {Component, Fragment} from 'react';
import Web3 from 'web3/dist/web3.min';
import Decentagram from './../abis/Decentagram.json';
import Navbar from './Navbar';
import Upload from './Upload';
import Images from './Images';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            decentagram: null,
            images: [],
            imageCount: 0,
            loading: true,
        };
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({method: 'eth_requestAccounts'});
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]});

        const networkId = await web3.eth.net.getId();
        const networkData = Decentagram.networks[networkId];

        if (!networkData) {
            window.alert('Decentagram contract not deployed to detected network.');
            return;
        }

        const decentagram = new web3.eth.Contract(Decentagram.abi, networkData.address);
        this.setState({decentagram});

        const imageCount = await decentagram.methods.imageCount().call();
        this.setState({imageCount});

        for (let i = 1; i <= imageCount; i++) {
            const image = await decentagram.methods.images(i).call();
            this.setState({
                images: [...this.state.images, image],
            });
        }

        this.setState({loading: false});
    }

    render() {
        const main = this.state.loading ? <p>loading</p> : <Images images={this.state.images}/>;
        return (
            <Fragment>
                <header className="bg-neutral-900 sticky top-0 w-full">
                    <Navbar account={this.state.account}/>
                </header>
                <main className="max-w-4xl mx-auto pt-2 flex flex-col lg:flex-row-reverse">
                    <aside className="lg:mx-auto">
                        <Upload decentagram={this.state.decentagram} account={this.state.account}/>
                    </aside>
                    {main}
                </main>
            </Fragment>
        );
    }
}

export default App;

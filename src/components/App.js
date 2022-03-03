import {Component, Fragment} from 'react';
import Web3 from 'web3/dist/web3.min';
import Decentagram from './../abis/Decentagram.json';
import Navbar from './Navbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            decentagram: null,
            images: [],
            imageCount: 0,
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
        this.setState({accounts: accounts[0]});

        const networkId = await web3.eth.net.getId();
        const networkData = Decentagram.networks[networkId];

        if (networkData) {
            const decentagram = new web3.eth.Contract(Decentagram.abi, networkData.address);
            this.setState({decentagram});

            const imageCount = await decentagram.methods.imageCount().call();
            this.setState({imageCount});
        } else {
            window.alert('Decentagram contract not deployed to detected network.');
        }
    }

    render() {
        return (
            <Fragment>
                <header>
                    <Navbar/>
                </header>
            </Fragment>
        );
    }
}

export default App;

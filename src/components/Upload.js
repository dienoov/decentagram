import {Component} from 'react';
import {Buffer} from 'buffer';
import {create} from 'ipfs-http-client';

// const ipfsClient = require('ipfs-http-client');
// const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

const ipfs = create('https://ipfs.infura.io:5001');

class Upload extends Component {
    captureFile(ev) {
        ev.preventDefault();

        const file = ev.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)});
            console.log('buffer', this.state.buffer);
        };
    }

    async uploadImage(ev) {
        ev.preventDefault();

        const description = this.imageDescription.value;

        const result = await ipfs.add(this.state.buffer);

        this.props.decentagram.methods.uploadImage(result.path, description).send({from: this.props.account});
    }

    render() {
        return (
            <form onSubmit={this.uploadImage.bind(this)} className="flex flex-col max-w-sm p-4">
                <input type="file" accept="image/jpeg, image/png" onChange={this.captureFile.bind(this)}
                       className="file:mr-4 file:py-2 file:px-4 mb-3
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-zinc-800 file:text-slate-50
                        hover:file:bg-zinc-700"
                />
                <textarea rows="3" ref={(input) => this.imageDescription = input}
                          className="min-w-full bg-zinc-800 p-2 border border-zinc-800 rounded mb-3"
                          placeholder="Description" required/>
                <button type="submit"
                        className="bg-blue-700 hover:bg-blue-600 transition rounded font-semibold py-2 px-4">
                    Upload
                </button>
            </form>
        );
    }
}

export default Upload;
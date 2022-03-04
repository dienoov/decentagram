import {Component} from 'react';
import Image from './Image';
import ImagesSkeleton from './ImagesSkeleton';

class Images extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            imageCount: 0,
            components: [],
            loading: true,
        };
    }

    sendTip(ev) {
        const id = ev.currentTarget.dataset.id;
        const value = window.web3.utils.toWei('1', 'ether');

        this.props.decentagram.methods.tipImageOwner(id)
            .send({from: this.props.account, value});
    }

    async componentDidMount() {
        const imageCount = await this.props.decentagram.methods.imageCount().call();
        this.setState({imageCount});

        for (let i = imageCount; i > 0; i--) {
            const image = await this.props.decentagram.methods.images(i).call();
            this.setState({
                images: [...this.state.images, image],
            });
        }

        const images = this.state.images.map((image, index) =>
            <Image image={image} key={index} sendTip={this.sendTip.bind(this)}/>,
        );
        this.setState({components: <div className="w-full p-4">{images}</div>});

        this.setState({loading: false});
    }

    render() {
        return this.state.loading ? <ImagesSkeleton/> : this.state.components;
    }
}

export default Images;
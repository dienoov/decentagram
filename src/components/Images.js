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

    async componentDidMount() {
        const imageCount = await this.props.decentagram.methods.imageCount().call();
        this.setState({imageCount});

        for (let i = 1; i <= imageCount; i++) {
            const image = await this.props.decentagram.methods.images(i).call();
            this.setState({
                images: [...this.state.images, image],
            });
        }

        const images = this.state.images.map((image, index) =>
            <Image image={image} key={index}/>,
        );
        this.setState({components: <div className="w-full p-4">{images}</div>});

        this.setState({loading: false});
    }

    render() {
        return this.state.loading ? <ImagesSkeleton/> : this.state.components;
    }
}

export default Images;
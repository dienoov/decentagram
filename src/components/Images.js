import {Component} from 'react';
import Image from './Image';

class Images extends Component {
    render() {
        const images = this.props.images.map((image, index)=>
            <Image image={image} key={index} />
        );

        return (
            <div className="p-4">
                {images}
            </div>
        );
    }
}

export default Images;
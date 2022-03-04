import {Component} from 'react';

class ImagesSkeleton extends Component {
    render() {
        return (
            <div className="w-full p-4">
                <div className="rounded bg-zinc-800 mb-4">
                    <div className="animate-pulse">
                        <div className="p-4 flex items-center">
                            <div className="w-8 h-8 bg-zinc-700 rounded-full mr-4"/>
                            <div className="md:w-96 w-64 max-w-full h-4 bg-zinc-700 rounded"/>
                        </div>
                        <div>
                            <div className="w-full lg:h-[32rem] h-[calc(100vw-2rem)] bg-zinc-700"/>
                            <div className="p-4">
                                <div className="w-full h-4 bg-zinc-700 rounded mb-4"/>
                                <div className="w-3/4 h-4 bg-zinc-700 rounded"/>
                            </div>
                        </div>
                        <div className="px-4 py-2 flex justify-between items-center border-t-2 border-zinc-900">
                            <div className="w-16 h-4 bg-zinc-700" />
                            <div className="w-6 h-6 rounded-full bg-zinc-700" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImagesSkeleton;
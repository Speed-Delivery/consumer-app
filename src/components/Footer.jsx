import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8 bottom-0">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                        <h2 className="text-lg font-bold text-white mb-4">Contact Us</h2>
                        <p className="text-gray-400">Yliopistokatu 9</p>
                        <p className="text-gray-400">90570 Oulu, Finland</p>
                        <p className="text-gray-400">yourmail@example.com</p>
                    </div>
                    <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                        <h2 className="text-lg font-bold text-white mb-4">FAQ's</h2>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-white">How do I get started?</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Where is the pickup point?</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">How do I track my order?</a></li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                        <h2 className="text-lg font-bold text-white mb-4">Terms of Service</h2>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et ultricies. In porta lorem at dui semper porttitor. Nullam quis cursus dui. Cras tincidunt vehicula tellus eu facilisis.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer
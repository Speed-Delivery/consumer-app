import React, { useState } from 'react';


const Locker = ({ id }) => {
    const [color, setColor] = useState('bg-red-400');

    const openLocker = () => {
        // ... handle locker opening logic
        // For the sake of this demo, I'm just changing the color
        setColor('bg-green-400');
    };

    return (
        <div className={`p-5 rounded text-center hover:bg-red-500 cursor-pointer locker ${color}`}>
            <p className="mb-2">{`Locker ${id}`}</p>
            <div>
                <input type="text" className="code-input p-2 mb-2 w-24 border rounded" placeholder="Code" />
                <button onClick={openLocker} className="bg-blue-500 text-white px-2 py-1 rounded">Open</button>
            </div>
        </div>
    );
};
export default Locker;

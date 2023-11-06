import React, { useState } from 'react';

const UseStatePage = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => setCounter(prevCounter => prevCounter + 1);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-semibold text-center">Counter</h1>
      <div className="flex flex-col items-center mt-4">
        <span className="text-2xl font-semibold">{counter}</span>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={incrementCounter}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default UseStatePage;

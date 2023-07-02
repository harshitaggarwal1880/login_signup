import React, { useState } from 'react';



const MyComponent = () => {
  const [x, setx] = useState(5)
  const [y, sety] = useState(5)
    const handleMouseMove = (event) => {
    // Handle mouse move event here
    setx((event.clientX *100)/ window.innerWidth)
    sety((event.clientY *100)/ window.innerHeight)
    console.log('Mouse coordinates:', (event.clientX *100)/ window.innerWidth + "%" , event.clientY);
  };

  return (
    <div onMouseMove={handleMouseMove} className='h-screen w-screen flex justify-center items-center'>
    
        <div className='h-[50%] w-[50%] bg-slate-400 overflow-hidden'>
      <div className={`h-4 w-4 rounded-full bg-black`} style={{position: "relative", top:`${y}%`, left:`${x}%`, transform:`translate(-${x}% -${y}%)`}}></div>
      </div>
      {/* <div> x : { x } {y}</div> */}
    </div>
  );
};

export default MyComponent;

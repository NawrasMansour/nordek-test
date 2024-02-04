import React, { useState } from 'react'

// lib
import { motion } from "framer-motion";
import { TbArrowsExchange2 } from "react-icons/tb";

function SwitchBtn({switchTokensEvent}) {
    const [isRotated, setIsRotated] = useState(false);

    const handleTap = () => {
        setIsRotated(!isRotated);
        switchTokensEvent()
    };


    return (
      <motion.div
          initial={{ scale: 0.9 , rotate: isRotated ? 180 : 0  }}
          whileHover={{scale: 1}}
          whileTap={{ scale: 0.8, rotate: isRotated ? 0 : 180 }}
          onTap={handleTap}
          className='md:col-span-2 col-span-12 flex flex-col items-center justify-center' >
          <TbArrowsExchange2  className='bg-white w-12 h-12 p-2 rounded-full shadow-default cursor-pointer md:rotate-0 rotate-90'/>
      </motion.div>
    )
}

export default SwitchBtn
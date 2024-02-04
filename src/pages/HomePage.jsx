import React, { useEffect, useState } from 'react'

// lib
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";

// custom
import SwitchBtn from '../components/SwitchBtn';
import TokensList from '../components/TokensList';
import allTokenList from "../utils/tokenList.json";
import { classNames } from '../utils/helper';
import { get } from '../utils/axios';

// regex
const numberRegex = /^\d+([.,]\d+)?$/;

function HomePage() {
  const [prices, setPrices] = useState();
  const [changeTokenSource, setChangeTokenSource] = useState(1);
  const [swapObj, setSwapObj] = useState({
    from : {
      value : null,
      token : allTokenList[0]
    },
    to : {
      value : null,
      token : allTokenList[1]
    }
  });
  //validation
  const [dataValidation , setDataValidation] = useState({
    from : false,
    to : false
  })
  //focus
  const [dataFocus , setDataFocus] = useState({
    from : false,
    to : false
  })
  // change amount handler
  const handleChangeAmount = (e) => {
    const id = e.target.id
    const value = e.target.value
    const toPrice = prices ? prices?.[swapObj.to.token.address] : 0;
    const fromPrice = prices ? prices?.[swapObj.from.token.address] : 0;
    if(id === 'from'){
      setSwapObj({...swapObj , from : {...swapObj.from , value : value} , to : {...swapObj.to , value : value * (toPrice/fromPrice) } })
    }else{
      setSwapObj({...swapObj , to : {...swapObj.to , value : value}, from : {...swapObj.from , value : value * (fromPrice/toPrice)} })
    }
  }
  // check the validation
  useEffect(() => {
		setDataValidation({
			...dataValidation,
			from: numberRegex.test(swapObj.from.value),
			to: numberRegex.test(swapObj.to.value),
		});
	}, [swapObj.from.value , swapObj.from.to]);
  // ======= tokens list modal ===========
  const [isTokensModalOpen , setIsTokensModalOpen] = useState(false)
  const handleChooseToken = (source) => {
    setChangeTokenSource(source)
    setIsTokensModalOpen(true)
  }
  const closeTokenModal = () =>{
    setIsTokensModalOpen(false)
  }
  // ====== change token ==========
  const handleModifyToken = (i) => {
      if (changeTokenSource === 1) {
        setSwapObj({
          from : {
            value : null,
            token : allTokenList[i]
          },
          to : {
            value : null,
            token : swapObj.to.token
          }
        })
        getSelectedTokenPrice(`${allTokenList[i].address},${swapObj.to.token.address}`)
      } else {
        setSwapObj({
          from : {
            value : 0,
            token : swapObj.from.token
          },
          to : {
            value : 0,
            token : allTokenList[i]
          }
        })
        getSelectedTokenPrice(`${allTokenList[i].address},${swapObj.from.token.address}`)
      }
      closeTokenModal();

  }
  // ====== switch tokens ==========
  const switchTokens = () => {
    const tempSawpObj = {
          from : {
            value : null,
            token : swapObj.to.token
          },
          to : {
            value : null,
            token : swapObj.from.token
          }
        }
    setSwapObj(tempSawpObj);
    getSelectedTokenPrice(`${tempSawpObj.from.token.address},${tempSawpObj.to.token.address}`)
  }

  // ===== get token price =====
  const getSelectedTokenPrice = async (contractsAddress) => {
    get(`/${contractsAddress}`).then((res) => {
      // console.log('data' , res.data.attributes.token_prices)
      setPrices(res.data.attributes.token_prices)
    }).catch((err) => {
        toast.error(err[0].title, {
                position: "top-left",
                autoClose : 4000
            });
        console.error("Error : ", err);
    })
  }

  useEffect(()=>{
    getSelectedTokenPrice(`${allTokenList[0].address},${allTokenList[1].address}`)
  },[])

  return (
    <div className='h-screen max-w-max-custom w-96vw mx-auto flex items-center'>
      <div className='flex flex-col space-y-24 items-center justify-center w-full h-full'>
        {/* title */}
        <h1 className='capitalize S-630:text-6xl text-4xl text-clr-tx-white font-Ubuntu font-bold text-center'>decentralised exchange</h1>
        {/* boxes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          className='grid grid-cols-12 md:gap-x-4 gap-y-8 w-full'>
          {/* box   */}
          <div className={classNames(
                          'md:col-span-5 col-span-12 relative rounded-md bg-transparent',
                          dataFocus.from && !dataValidation.from ? 'shadow-1 shadow-red-500' : "shadow-1"
                        )}
          >
            <input  type="text"
                    id = {'from'}
                    value={swapObj.from.value}
                    onChange={(e)=>handleChangeAmount(e)}
                    autoComplete="off"
                    aria-describedby="uidnote"
									  aria-invalid={dataValidation.from ? "false" : "true"}
                    onFocus={() => setDataFocus({ ...dataFocus, from: true })}
									  onBlur={() => setDataFocus({ ...dataFocus, from: false })}
                    className='bg-clr-dark-blue-1 rounded-md outline-none text-xl text-black placeholder:text-clr-dark-blue-2 placeholder:text-2xl  w-full h-full py-6 px-10'
                    placeholder='0'
            />
            <div
									id="uidnote"
									className={
										dataFocus.from && !dataValidation.from
											? " font-medium absolute -bottom-6 text-red-500 text-xs ml-4 mt-1 "
											: "hidden"
									}
								>
									Only Numbers
						</div>
            <div onClick={()=>handleChooseToken(1)}
                  className='absolute top-1/3 right-5 w-28 py-2 rounded-md bg-clr-dark-blue-2 text-clr-tx-white flex flex-row items-center justify-between px-2 cursor-pointer' >
              <div className='flex flex-row space-x-1 items-center justify-center'>
                <img src={swapObj.from.token.img} alt={swapObj.from.token.ticker} className='w-5 h-5' />
                <span className='font-bold text-sm'>{swapObj.from.token.ticker}</span>
              </div>
              <MdKeyboardArrowDown className='w-5 h-5' />
            </div>
          </div>
          {/* icon */}
          <SwitchBtn switchTokensEvent={switchTokens} />
          {/* box   */}
          <div className={classNames(
                          'md:col-span-5 col-span-12 relative rounded-md bg-transparent',
                          dataFocus.to && !dataValidation.to ? 'shadow-1 shadow-red-500' : "shadow-1"
                        )}
          >
            <input  type="text"
                    id = {'to'}
                    value={swapObj.to.value}
                    onChange={(e)=>handleChangeAmount(e)}
                    autoComplete="off"
                    aria-describedby="uidnote"
									  aria-invalid={dataValidation.to ? "false" : "true"}
                    onFocus={() => setDataFocus({ ...dataFocus, to: true })}
									  onBlur={() => setDataFocus({ ...dataFocus, to: false })}
                    className='bg-clr-dark-blue-1 rounded-md outline-none text-xl text-black placeholder:text-clr-dark-blue-2 placeholder:text-2xl  w-full h-full py-6 px-10'
                    placeholder='0'
            />
             <div
									id="uidnote"
									className={
										dataFocus.to && !dataValidation.to
											? " font-medium absolute -bottom-6 text-red-500 text-xs ml-4 mt-1 "
											: "hidden"
									}
								>
									Only Numbers
						</div>
            <div onClick={()=>handleChooseToken(2)}
                  className='absolute top-1/3 right-5 w-28 py-2 rounded-md bg-clr-dark-blue-2 text-clr-tx-white flex flex-row items-center justify-between px-2 cursor-pointer' >
              <div className='flex flex-row space-x-1 items-center justify-center'>
                <img src={swapObj.to.token.img} alt={swapObj.to.token.ticker} className='w-5 h-5' />
                <span className='font-bold text-sm'>{swapObj.to.token.ticker}</span>
              </div>
              <MdKeyboardArrowDown className='w-5 h-5' />
            </div>
          </div>
        </motion.div>
      </div>
      <TokensList isOpen={isTokensModalOpen} closeIt={closeTokenModal} changeTokenEvent={handleModifyToken} />
    </div>
  )
}

export default HomePage
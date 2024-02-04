import React from 'react'

// lib
import { Modal} from "antd";

// custom
import tokenList from "../utils/tokenList.json";

function TokensList({isOpen , closeIt , changeTokenEvent}) {
  return (
    <Modal
        open={isOpen}
        footer={null}
        onCancel={() => closeIt(false)}
        title="Select a token"
      >
        <div className="border-t border-clr-border-1 mt-5 flex flex-col gap-2">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="flex items-center justify-start py-2 pl-5 hover:cursor-pointer hover:bg-clr-dark-blue-2"
                key={i}
                onClick={() => changeTokenEvent(i)}
              >
                <img src={e.img} alt={e.ticker} className="w-10 h-10" />
                <div className="tokenChoiceNames">
                  <div className="ml-2 text-lg font-medium">{e.name}</div>
                  <div className="ml-2 text-base font-light text-clr-tx-choise">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
  )
}

export default TokensList
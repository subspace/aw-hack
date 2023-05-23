import React, { useEffect, useState } from "react";

import shopBackground from "./assets/images/storeBackground.png";
import { ShopOwnerIcon } from "./ShopOwnerIcon";
import { PlayerIcon } from "./PlayerIcon";
import { Conversation, conversationData } from "./helpers";

import useModal from "./hooks/useModal";
import Inventory from "./Inventory";

const Shop: React.FC = () => {
  const [currentConversation, setCurrentConversation] =
    useState<string>("greeting");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    if (selectedOption === "buy") {
      toggle();
    } else if (selectedOption === "cancel") {
      setCurrentConversation("goodbye");
      setShowOptions(false);
    }
  }, [selectedOption]);

  const handleNextMessage = () => {
    if (currentConversation === "greeting") {
      setShowOptions(true);
    } else {
      //TODO: implement store exit
    }
  };

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  const currentConversationData =
    conversationData[currentConversation as keyof Conversation];

  return (
    <div
      className="flex items-end min-h-[1024px] min-w-[1024px]"
      style={{
        backgroundImage: `url(${shopBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="relative w-full flex mx-10 mb-10">
        <div className="w-full flex justify-between">
          <PlayerIcon
            isMyPlayer={true}
            additionalClass="w-60 h-72 bg-transparent"
          />
          <ShopOwnerIcon additionalClass="w-60 h-60" />
        </div>

        <div className="z-40 absolute inset-0 bg-[#ecddc0] h-36 p-10 rounded-md mt-36 ">
          {!showOptions && currentConversationData && (
            <div className="flex flex-col gap-10">
              <p className="font-serif italic leading-tight text-primary font-medium text-lg">
                <strong>{currentConversationData.speaker}: </strong>
                <span>{currentConversationData.message}</span>
              </p>
              <button onClick={handleNextMessage}>Next</button>
            </div>
          )}

          {showOptions && (
            <div className="flex justify-between gap-2">
              <button
                className="w-full bg-[#dab364]/75 px-40 items-center border border-[#e1a123]  rounded-md"
                onClick={() => handleOptionSelected("buy")}
              >
                Buy
              </button>
              <button
                className="w-full bg-[#dab364]/75 py-4 px-40 items-center border border-[#e1a123]  rounded-md"
                onClick={() => handleOptionSelected("cancel")}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <Inventory isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

export default Shop;

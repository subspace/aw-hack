import Modal from "./Modal";
import Tabs from "./Tabs";

import fence from "./assets/images/tileset/buildings/fence1.png";
import creature from "./assets/images/player2.png";

interface InventoryType {
  isOpen: boolean;
  toggle: () => void;
}

// TODO: replace placeholder items with player items
const Inventory = ({ isOpen, toggle }: InventoryType) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="w-full h-full bg-[#ecddc0] p-5 flex flex-col gap-4 items-center">
        <h2 className="font-serif italic leading-tight text-primary font-medium text-2xl">
          Inventory
        </h2>
        <Tabs
          elements={[
            {
              title: "items",
              body: (
                <>
                  <div className="w-full grid grid-cols-6 gap-4 items-start">
                    <div className="flex flex-col-reverse gap-2">
                      <p>Name</p>
                      <img className="w-8 h-8" src={fence} alt="item" />
                    </div>
                    <div className="flex flex-col-reverse gap-2">
                      <p>Name</p>
                      <img className="w-8 h-8" src={fence} alt="item" />
                    </div>
                  </div>
                </>
              ),
            },
            {
              title: "creatures",
              body: (
                <>
                  <div className="w-full grid grid-cols-6 gap-4 items-start">
                    <div className="flex flex-col-reverse gap-2">
                      <p>Name</p>
                      <img className="w-8 h-8" src={creature} alt="item" />
                    </div>
                    <div className="flex flex-col-reverse gap-2">
                      <p>Name</p>
                      <img className="w-8 h-8" src={creature} alt="item" />
                    </div>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    </Modal>
  );
};

export default Inventory;

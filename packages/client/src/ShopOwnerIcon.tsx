import ownerImg from "./assets/images/storeOwner.png";

export const ShopOwnerIcon = ({
  additionalClass = "w-8 h-8",
}: {
  additionalClass?: string;
}) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center ${additionalClass}`}
    >
      <img src={ownerImg} alt="icon" className="w-full h-full object-cover" />
    </div>
  );
};

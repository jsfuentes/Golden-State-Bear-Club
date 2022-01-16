import React from "react";
interface PersonCardProps {
  url: string;
  name: string;
}
const PersonCard = (props: PersonCardProps) => {
  return (
    <div
      className={
        "flex flex-col items-center rounded-xl bg-white border-2 border-amber-100 h-56 w-full overflow-hidden"
      }
    >
      <img
        src={props.url}
        className={"w-36 h-36 flex-shrink object-cover rounded-full"}
        alt="Person"
      />
      <div>{props.name}</div>
    </div>
  );
};

export default PersonCard;

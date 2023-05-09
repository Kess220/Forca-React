import React from "react";

const letras = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Letras = ({ onClick, disabled }) => {
  console.log("oi");
  return (
    <div className="letras">
      {letras.map((letra) => (
        <button
          key={letra}
          className="letra"
          onClick={() => onClick(letra)}
          disabled={disabled}
        >
          {letra}
        </button>
      ))}
    </div>
  );
};

export default Letras;

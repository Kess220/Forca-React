import React from "react";

export const letras = [
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
  return (
    <div className="letras">
      {letras.map((letra) => (
        <button
          data-test="letter" 
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

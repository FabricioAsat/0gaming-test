import { useState } from "react";
import { Number } from "./components/Number";
import { Roulette } from "./components/Roulette";

const typeOptions = {
  NUMBERS: "numbers",
  RULETTE: "roulette",
};

function App() {
  const [option, setOption] = useState<string>();

  function handleButtons(op: string) {
    setOption(op);
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto min-h-screen h-full">
        <h1 className="text-6xl flex items-center justify-center py-10 font-bold gap-2">Random number testing</h1>
        <div className="flex items-center justify-center gap-x-10">
          <button
            onClick={() => {
              handleButtons(typeOptions.NUMBERS);
            }}
            className=" bg-sky-500 text-white px-5 py-2 my-5 font-bold rounded-lg text-lg cursor-pointer hover:brightness-90 disabled:brightness-50"
          >
            Números
          </button>
          <button
            onClick={() => {
              handleButtons(typeOptions.RULETTE);
            }}
            className=" bg-red-500 text-white px-5 py-2 my-5 font-bold rounded-lg text-lg cursor-pointer hover:brightness-90 disabled:brightness-50"
          >
            Ruleta
          </button>
        </div>

        {option === typeOptions.NUMBERS && <Number />}
        {option === typeOptions.RULETTE && <Roulette />}
      </div>
    </>
  );
}

export default App;

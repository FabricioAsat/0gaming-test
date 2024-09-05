import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import { getRandomNumber } from "../api/getRandomNumber";
import { toast } from "sonner";

export const Roulette = () => {
  const [numbers, setNumbers] = useState<WheelData[]>([{ option: "0" }]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!mustSpin) {
      // TODO - resuesta de la api
      async function getData() {
        const data = await getRandomNumber({ limit: 24 });
        // console.log(data);

        if (!data.status) {
          toast.error("Error con el servidor");
          return;
        }

        toast.success(`El valor a salir debería ser: ${data.data.data.value}`);
        setPrizeNumber(data.data.data.value);
        setMustSpin(true);
      }

      getData();
    }
  };

  // Effects - Rellena el array de opciones
  useEffect(() => {
    for (let index = 0; index < 24; index++) {
      const newOptions = Array.from({ length: 24 }, (_, index) => ({ option: index.toString() }));
      setNumbers(newOptions);
    }
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <small className="italic font-semibold">Acá pongo el límite de 24 por que sino los números no se pueden distinguir</small>
      <div className="mt-10">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={numbers}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 pt-10 w-full h-full">
        <span className="flex flex-col items-center justify-center">
          <input
            type="submit"
            value="Solicitar número"
            className=" bg-black text-white px-5 py-2 my-5 font-bold rounded-lg text-lg cursor-pointer hover:brightness-90 disabled:brightness-50"
          />
        </span>
      </form>
    </section>
  );
};

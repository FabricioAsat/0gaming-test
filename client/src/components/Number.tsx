import { useState } from "react";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import { getRandomNumber } from "../api/getRandomNumber";
import { toast } from "sonner";

export const Number = () => {
  const [number, setNumber] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^(|[1-9][0-9]*)$/;
    if (!regex.test(e.target.value)) return;
    setLimit(parseInt(e.target.value));
  }

  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    async function getData() {
      const data = await getRandomNumber({ limit });
      // console.log(data);

      if (!data.status) {
        toast.error("Error con el servidor");
        return;
      }

      setNumber(data.data.data.value);
      toast.success(`El valor a salir debería ser: ${data.data.data.value}`);
    }

    if (number < 0 || number > 1000000) {
      toast.error("Los valores límites aceptados son: [0-1000000]");
    }

    getData();
  }

  return (
    <section className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 pt-10 w-full h-full">
        <h2 className="text-3xl font-bold text-center">Selecciona el límite del valor que obtendrás [0-1000000]</h2>
        <span className="flex flex-col px-10">
          <label htmlFor="username" className="font-bold mb-3">
            Límite de número <b className="text-red-500">*</b>
          </label>
          <input
            type="text"
            required
            value={limit}
            onChange={handleChange}
            autoComplete="off"
            name="limit"
            maxLength={20}
            placeholder="From 0 to 100 (default)"
            className="py-2 px-3 rounded-md outline-none font-bold placeholder:italic text-sky-500"
          />
        </span>

        <span className="flex flex-col items-center justify-center">
          <input
            type="submit"
            value="Solicitar número"
            className=" bg-black text-white px-5 py-2 my-5 font-bold rounded-lg text-lg cursor-pointer hover:brightness-90 disabled:brightness-50"
          />
        </span>
      </form>
      <hr className="border-black" />

      <div className="flex items-center justify-center mt-20 font-bold h-full">
        <AnimatedNumber value={number} hasComma={false} size={60} duration={2000} />
      </div>
    </section>
  );
};

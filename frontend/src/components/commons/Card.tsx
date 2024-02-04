import { DOMAttributes, FC, useEffect, useState } from "react";

import { apiClient } from "@/utils/api";

const Card: FC<{
  id: number;
  onClick?: DOMAttributes<HTMLElement>["onClick"];
}> = ({ id, onClick }) => {
  const [text, setText] = useState<string>();

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/cards/{card}", {
        params: {
          path: {
            card: id,
          },
        },
      });

      if (response.data) {
        setText(response.data.text);
      }
    };

    handle();
  }, [id]);

  return (
    <article
      onClick={onClick}
      className="w-28 h-48 p-4 flex justify-between shadow-xl rounded-md border-black border-2 bg-white text-black hover:scale-105 cursor-pointer"
    >
      <header>
        <h1>{text}</h1>
      </header>
      <footer></footer>
    </article>
  );
};

export default Card;

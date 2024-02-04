import { DOMAttributes, FC, useEffect, useState } from "react";

import { apiClient } from "@/utils/api";

import useAuth from "@/hooks/useAuth";

const Card: FC<{
  id: number;
  onClick?: DOMAttributes<HTMLElement>["onClick"];
}> = ({ id, onClick }) => {
  const [text, setText] = useState<string>();

  const { token } = useAuth();

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/cards/{card}", {
        params: {
          path: {
            card: id,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setText(response.data.text);
      }
    };

    handle();
  }, [id, token]);

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

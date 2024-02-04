import { NextPage } from "next";

import { redirect } from "next/navigation";

import { useState } from "react";

const Page: NextPage = () => {
  const [invitation, setInvitation] = useState<string>();

  const canJoin = (invitation && invitation.length > 0) === true;

  return (
    <div>
      <h1>Join a session using their invitation code</h1>
      <div>
        <input
          type="text"
          value={invitation}
          onChange={(event) => setInvitation(event.target.value)}
        />
        <button
          disabled={canJoin}
          onClick={() => {
            redirect(`/session/${invitation}`);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Page;

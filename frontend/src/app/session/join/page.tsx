"use client";

import { NextPage } from "next";

import { useState } from "react";

import { RedirectType, redirect } from "next/navigation";

import { apiClient } from "@/utils/api";

const Page: NextPage = () => {
  const [invitation, setInvitation] = useState<string>();

  const disabled = (invitation && invitation.length > 0) === false;

  return (
    <div>
      <input
        type="text"
        value={invitation}
        placeholder="Invitation code"
        onChange={(event) => setInvitation(event.target.value)}
      />
      <button
        disabled={disabled}
        onClick={async () => {
          if (invitation === undefined) return;

          const response = await apiClient().GET(
            "/sessions/join/{invitation}",
            {
              params: {
                path: {
                  invitation,
                },
              },
            }
          );

          if (response.data) {
            redirect("/session", RedirectType.replace);
          } else {
            alert("Failed to join session");
          }
        }}
      >
        Join
      </button>
    </div>
  );
};

export default Page;

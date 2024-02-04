import { NextPage } from "next";

import Link from "next/link";

const Page: NextPage = async () => {
  return (
    <div className="flex gap-10 m-auto">
      <Link
        href="/session"
        title="Create a new session"
      >
        Create a new session
      </Link>
      <Link
        href="/session/join"
        title="Join an existing session"
      >
        Join an existing session
      </Link>
    </div>
  );
};

export default Page;

import { NextPage } from "next";

import Link from "next/link";

const Page: NextPage = async () => {
  return (
    <div className="flex gap-10">
      <Link
        href="/new"
        title="Create a new session"
      />
      <Link
        href="/join"
        title="Join an existing session"
      />
    </div>
  );
};

export default Page;

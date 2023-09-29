"use client";

import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") return;
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status]);
  return (
    <div>
      <Feed />
    </div>
  );
}

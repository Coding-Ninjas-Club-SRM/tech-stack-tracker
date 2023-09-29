"use client";

import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) router.push("/api/auth/signin");
  }, [session]);
  return (
    <div>
      <Feed />
    </div>
  );
}

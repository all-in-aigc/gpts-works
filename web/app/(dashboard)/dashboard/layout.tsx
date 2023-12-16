"use client";

import { useEffect, useState } from "react";

import Sidebar from "./_components/Sidebar";
import { User } from "@/app/types/user";

export default ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const uri = "/api/dashboard/user-info";
    const resp = await fetch(uri, {
      method: "GET",
    });
    setLoading(false);

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        console.log("login user:", res.data);
        setUser(res.data);
        return;
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <Sidebar user={user} />

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

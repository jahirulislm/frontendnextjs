"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { assert } from "console";
import { toast } from "react-hot-toast";
import router from "next/router";

export default function onLogin() {
  const router = useRouter();
  // getting user credentials
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // handling login
  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  // talking to the db
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      toast.success("login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl mb-3 text-red-900">
          {loading ? "processing" : "login"}
        </h1>
        <hr />
        <label htmlFor="username">email</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border-2 p-1 rounded-xl"
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border-2 p-1 rounded-xl"
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="px-3 py-2 border rounded-xl focus:outline-none focus:border-gray-500 mt-4"
        >
          Login
        </button>
        <Link className="mt-3 border p-1" href={"/signup"}>
          Visit Sign up
        </Link>
      </div>
    </>
  );
}

"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  // push the user into the login
  const router = useRouter();

  // getting user credentials
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(false);

  //getting loading information
  const [loading, setLoading] = React.useState(false);

  // talking to the db
  const onSignup = async () => {
    try {
      setLoading(true);

      // making request
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl mb-3 text-red-900">
          {loading ? "processing" : "Signup"}
        </h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="border-2 p-1 rounded-xl"
          placeholder="username"
        />
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
          onClick={onSignup}
          className="px-3 py-2 border rounded-xl focus:outline-none focus:border-gray-500 mt-4"
        >
          {buttonDisable ? "No Signup" : "Signup"}
        </button>
        <Link className="mt-3 border p-1" href={"/login"}>
          Visit Login
        </Link>
      </div>
    </>
  );
}

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../app/page.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Hello next js</h1>
    </>
  );
}

import Head from "next/head";
import Image from "next/image";
import Home from "./home";
export default function Page() {
  return (
    <>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Future learning experience with Edvora" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}

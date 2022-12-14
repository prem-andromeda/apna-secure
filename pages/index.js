import Head from "next/head";
import Form from "../components/Form";
import InsuranceAdverise from "../components/InsuranceAdverise";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ApnaSecure</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mt-5 d-flex flex-column flex-md-row pb-5">
          <InsuranceAdverise />
          <Form />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

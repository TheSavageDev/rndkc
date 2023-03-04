import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../components/footer";
import { GetInTouch } from "../components/getInTouch";
import { NavBar } from "../components/navBar";
import { usePageTracking } from "../hooks/usePageTracking";

export default function ContactUs() {
  const router = useRouter();
  usePageTracking(router);
  return (
    <>
      <Head>
        <title>RND - Contact Us</title>
      </Head>
      <main>
        <NavBar />
        <section className="main">
          <GetInTouch />
        </section>
        <Footer />
      </main>
    </>
  );
}

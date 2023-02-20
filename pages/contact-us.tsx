import { useRouter } from "next/router";
import { GetInTouch } from "../components/getInTouch";
import { NavBar } from "../components/navBar";
import { usePageTracking } from "../hooks/usePageTracking";

export default function ContactUs() {
  const router = useRouter();
  usePageTracking(router);
  return (
    <main>
      <NavBar />
      <GetInTouch />
    </main>
  );
}

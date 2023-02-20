import { GetInTouch } from "../components/getInTouch";
import { NavBar } from "../components/navBar";
import { usePageTracking } from "../hooks/usePageTracking";

export default function ContactUs() {
  usePageTracking();
  return (
    <main>
      <NavBar />
      <GetInTouch />
    </main>
  );
}

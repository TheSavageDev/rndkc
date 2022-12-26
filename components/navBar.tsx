import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="bg-secondary py-3 px-3 flex justify-between items-center">
      <section className="flex space-x-8 items-center">
        <article className="space-y-2">
          <span className="block w-8 h-1 bg-light"></span>
          <span className="block w-8 h-1 bg-light"></span>
          <span className="block w-8 h-1 bg-light"></span>
        </article>
        <Image src="/img/RNDWhite2.svg" alt="RNDKC" width="99" height="40" />
      </section>
      <article>
        <Link href="/">rndkc.com</Link>
      </article>
    </nav>
  );
};

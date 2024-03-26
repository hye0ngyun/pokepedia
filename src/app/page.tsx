/**
 * 목록 페이지
 */

import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";

export default function List() {
  return (
    <main>
      pokepedia
      <Image src={PokemonLogo} alt="pokemon logo" />
    </main>
  );
}

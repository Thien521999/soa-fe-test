import Activities from "./activities";
import Map from "./map";
// import Titre from './titre'
import Block from "./block";
import Experiences from "./experiences";
import Memory from "./memory";
import Explore from "./explore";

export default function Main() {
  return (
    <main className="flex-grow flex flex-col gap-20">
      {/* Title 1 */}
      <Block />

      {/* Title 2 */}
      <Map />

      {/* Nos activités */}
      <Activities />

      {/* Titre */}
      {/* <Titre /> */}

      {/* Des expériences inoubliables Lorem Ipsum truc */}
      <Experiences />

      {/* Immortalisez des moments inoubliables avec #BASIC */}
      <Memory />

      {/* Explorez avec BASIC dès aujourd’hu */}
      <Explore />
    </main>
  );
}

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
      <div>
        <section className="h-screen flex flex-col">
          <Navbar />
          <Hero />
        </section>
      </div>
    );
}

export default HomePage;
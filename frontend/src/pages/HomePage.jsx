import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
      <div>
        <section className="">
          <Navbar />
          <Hero />
        </section>
        <HowItWorks />
      </div>
    );
}

export default HomePage;
import About from "../components/About";
import CallToAction from "../components/Calltoaction";
import Footer from "../components/Footer";
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
      <About />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;

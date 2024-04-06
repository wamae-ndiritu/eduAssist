import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <section className=''>
        <Navbar />
        <Hero />
      </section>
      <HowItWorks />
      <div className='h-screen relative homeBody'>
        <div className='flex flex-col items-center absolute top-0 bottom-0 left-0 right-0 overlay'>
          <div className='grid md:grid-cols-5'>
            <section className='col-span-2 text-black  '>
              <h1 className='p-4 text-2xl font-bold'>
                EduAssist Connect Platform
              </h1>
              <p className='p-3 font-semibold text-xl '>
                Are you looking for education fanancial assist? Then look no
                further, EduAssit got you covered!!
              </p>
              <p className='p-3 font-semibold text-xl '>
                Singup with us for free! make your application and wait for your
                dream of studing become a reality beside having no finances to
                fund your studies.
              </p>
            </section>
            <section className='col-span-3'>
              <h1 className='text-2xl  item-center pt-4 m-auto pl-10 font-bold'>
                About Us
              </h1>
              <p className='p-3 font-semibold '>
                EduAssist is an online platform created due to the high number
                of students sicking for financial aid to fund thier studies. It
                is obvious that there are still a good number of good
                sarmaritans who would wish to offer assistance to such students
                but lack ways to connect with them.
              </p>
              <p className='p-3 font-semibold'>
                With this Platfom, the students sicking the financial aid, files
                an application with thier informatiom including thier name,
                school, course and the amount of money they need.On the other
                side, the aspiring sponser can view the students application and
                decide to offer the assistance.The platform therefore provide a
                way by wich the student can communicate with assiprant sponsor
                through text messages which enales the them to atleast get some
                nessary information about each other that enhances the aiding.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

import eduAssist from "../assets/background.jpeg"

const About = () => {
  return (
    <div className='w-full p-4 md:p-10 bg-emerald-300'>
      <h2 className='text-3xl font-semibold text-center text-gray-900 mt-6'>
        About Us
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-5 my-6 flex items-center'>
        <section className='col-span-1 md:col-span-2'>
            <img src={eduAssist} alt="EduAssist" className="h-full w-full object-cover rounded-lg" />
          {/* <h1 className='p-4 text-2xl font-bold'>EduAssist Connect Platform</h1>
          <p className='p-3 font-semibold text-xl '>
            Are you looking for education fanancial assist? Then look no
            further, EduAssit got you covered!!
          </p>
          <p className='p-3 font-semibold text-xl '>
            Singup with us for free! make your application and wait for your
            dream of studing become a reality beside having no finances to fund
            your studies.
          </p> */}
        </section>
        <section className='col-span-1 md:col-span-3'>
          <p className='p-3'>
            EduAssist is an online platform created due to the high number of
            students sicking for financial aid to fund thier studies. It is
            obvious that there are still a good number of good sarmaritans who
            would wish to offer assistance to such students but lack ways to
            connect with them.
          </p>
          <p className='p-3'>
            With this Platfom, the students sicking the financial aid, files an
            application with thier informatiom including thier name, school,
            course and the amount of money they need.On the other side, the
            aspiring sponser can view the students application and decide to
            offer the assistance.The platform therefore provide a way by wich
            the student can communicate with assiprant sponsor through text
            messages which enales the them to atleast get some nessary
            information about each other that enhances the aiding.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About
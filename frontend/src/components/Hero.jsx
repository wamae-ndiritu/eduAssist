const Hero = () => {
  return (
    <section className="hero">
      <section className='h-full px-4 py-20 text-center bg-emerald-300 text-white hero-overlay flex'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Empower Dreams, Transform Lives
          </h1>
          <p className='text-lg md:text-xl mb-4'>
            Struggling with education finances? We&apos;re here to help.
          </p>
          <p className='text-lg md:text-xl mb-8'>
            Our platform connects students with generous donors who believe in
            the power of education.
          </p>
          <a
            href='#how-it-works'
            className='bg-white text-emerald-500 hover:bg-emerald-300 py-3 px-6 rounded-full text-lg md:text-xl font-semibold transition duration-300'
          >
            Learn More
          </a>
        </div>
      </section>
    </section>
  );
};

export default Hero;

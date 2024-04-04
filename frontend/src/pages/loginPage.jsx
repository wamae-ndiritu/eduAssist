const LoginPage = () => {
  return (
    <div className="bg-alice-blue w-1/5 item-align-center">
      <h1>Welcome To EduAssist System</h1>
      <h1 className="text-3xl font-bold  bg-red">Hello world!</h1>
      <section className="">
        <label className="">Email</label>
        <input
          type="email"
          placeholder="wamaimatu@gmail.com"
          className=""
        ></input>
        <label className="">Password</label>
        <input type="password" placeholder="Aabcd123" className=""></input>
      </section>
    </div>
  );
};
export default LoginPage;

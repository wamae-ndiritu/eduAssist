const LoginPage = () => {
  return (
    <div className="loginBody">
      <container>
        <h1 className="welcome">Welcome To EduAssist System</h1>
        <section className="login">
          <label className="py-1">Email</label>
          <input
            type="text"
            placeholder="wamaimatu@gmail.com"
            className="border px-4 py-2 rounded-lg text-gray-600 focus:outline-amber-400"
          ></input>
          <label className="py-1">Password</label>
          <input
            type="password"
            placeholder="********"
            className="border px-4 py-2 rounded-lg text-gray-600 focus:outline-amber-400"
          ></input>
          <button
            className="bg-gray-900 border text-white rounded py-3 px-4 
        text-xl font-semibold hover:bg-transparent hover:text-gray-900 hover:
        border-gray-600"
          >
            Sign In
          </button>
        </section>
      </container>
    </div>
  );
};
export default LoginPage;

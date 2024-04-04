const RegisterPage = () => {
  return (
    <div>
      <form>
        <div>
          <lable>Full Name</lable>
          <input type="text" placeholder="Matu Wamai" className=""></input>
        </div>
        <div>
          <lable>Email</lable>
          <input
            type="email"
            placeholder="wamaimatu@gmail.com"
            className=""
          ></input>
        </div>
        <div>
          <lable>Contact</lable>
          <input type="number" placeholder="+254700699478" className=""></input>
        </div>
        <div>
          <lable>Password</lable>
          <input type="password" placeholder="Abcd123" className=""></input>
        </div>
        <div>
          <lable>Confirm Password</lable>
          <input type="password" className=""></input>
        </div>
        <div>
          <lable>Full Name</lable>
          <input type="text" placeholder="Matu Wamai" className=""></input>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;

import { Container } from "postcss";

const RegisterPage = () => {
  return (
    <div className="regBody">
      <form className="regform">
        <h1 className="reg">Register</h1>
        <div className="w-2/5 m-auto bg-yellow">
          <label>Full Name</label>
          <input type="text" placeholder="Matu Wamai" className=""></input>
          <label>Email</label>
          <input
            type="email"
            placeholder="wamaimatu@gmail.com"
            className=""
          ></input>
          <label>Contact</label>
          <input type="number" placeholder="+254700699478" className=""></input>
          <label>Password</label>
          <input type="password" placeholder="Abcd123" className=""></input>
          <label>Confirm Password</label>
          <input type="password" className=""></input>
          <label>Full Name</label>
          <input type="text" placeholder="Matu Wamai" className=""></input>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;

const CallToAction = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold p-3 flex justify-center">
        Subscribe to our maillist
      </h2>
      <div className="bg-white p-4 flex justify-center gp-2 gap-3 items-center ">
        <label htmlFor="email" className="text-emerald-500 text-xl">
          Email
        </label>
        <input
          type="email"
          className="border outline-emerald-300 p-2 flex items-center "
        />
        <button className="bg-emerald-300 teet-white rounded px-4 py-2 text-white">
          Submit
        </button>
      </div>
    </div>
  );
};
export default CallToAction;

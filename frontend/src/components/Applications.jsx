const Applications = () => {
  return (
    <div className="w-full">
      <div className="w-full my-2 border p-4">
        <span className="flex gap-3 justify-end">
          <h6 className="bg-green-500 text-white px-4 py-1 rounded">
            Approved
          </h6>
          <h6 className="bg-slate-200  text-green-500 px-4 py-1 rounded">
            5th Apr 2024 12:04PM
          </h6>
          <button className="bg-black text-white px-4 py-1 rounded">
            View
          </button>
        </span>
        <div>
          <h6 className="text-gray-600 text-normal">Application details</h6>
          <p className="text-gray-600 text-md py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel
            nulla ea asperiores assumenda minima aliquid quidem quia eum nisi
            soluta non, quos repellendus, repudiandae officia. Commodi culpa
            numquam iste?
          </p>
        </div>
        <span className="text-sm text-gray-600">5 Reviews</span>
      </div>
      <div className="w-full my-2 border p-4">
        <span className="flex gap-3 justify-end">
          <h6 className="bg-orange-400 text-white px-4 py-1 rounded">
            Pending
          </h6>
          <h6 className="bg-slate-200 text-green-500 px-4 py-1 rounded">
            10th Apr 2024 01:57AM
          </h6>
          <button className="bg-black text-white px-4 py-1 rounded">
            View
          </button>
        </span>
        <div>
          <h6 className="text-gray-600 text-normal">Application details</h6>
          <p className="text-gray-600 text-md py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel
            nulla ea asperiores assumenda minima aliquid quidem quia eum nisi
            soluta non, quos repellendus, repudiandae officia. Commodi culpa
            numquam iste?
          </p>
        </div>
        <span className="text-sm text-gray-600">10 Reviews</span>
      </div>
      <div className="w-full my-2 border p-4">
        <span className="flex gap-3 justify-end">
          <h6 className="bg-red-600 text-white px-4 py-1 rounded">
            Disapproved
          </h6>
          <h6 className="bg-slate-200 text-green-500 px-4 py-1 rounded">
            18th Mar 2024 7:05Ap
          </h6>
          <button className="bg-black text-white px-4 py-1 rounded">
            View
          </button>
        </span>
        <div>
          <h6 className="text-gray-600 text-normal">Application details</h6>
          <p className="text-gray-600 text-md py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel
            nulla ea asperiores assumenda minima aliquid quidem quia eum nisi
            soluta non, quos repellendus, repudiandae officia. Commodi culpa
            numquam iste?
          </p>
        </div>
        <span className="text-sm text-gray-600">16 Reviews</span>
      </div>
    </div>
  );
};
export default Applications;

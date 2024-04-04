import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className='h-screen bg-emerald-300 text-white flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-white'>404 - Not Found!</h1>
      <p className='my-3 text-lg'>
        Ooops!! The page requested was not found...
      </p>
      <Link to='/'>
        <button className='my-3 bg-black py-2 px-6 text-white rounded font-semibold'>
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage
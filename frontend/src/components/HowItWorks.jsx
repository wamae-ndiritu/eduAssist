import { Link } from "react-router-dom"
import HorizontalLinearStepper from "./utils/Stepper"

const HowItWorks = () => {
  return (
    <div className="w-full my-5 px-4 md:px-16 py-4" id='how-it-works'>
        <h2 className="text-3xl font-semibold text-center text-gray-600 mt-6">How It Works</h2>
        <p className="text-gray-600 py-5 text-center">It takes a few step to start creating new application. To get you started, here are the steps yo&apos;ll follow;</p>
        <HorizontalLinearStepper />
        <div className="mb-3 flex justify-center">
          <Link to="/profile" className="px-4 py-2 rounded-full text-gray-900 text-xl border">Start Application</Link>
        </div>
    </div>
  )
}

export default HowItWorks
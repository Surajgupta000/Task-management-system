import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Things Done With TaskFlow</h1>
      <p className="text-lg text-gray-600 mb-6">Manage your tasks efficiently and effortlessly.</p>
      <p className="text-lg text-gray-600 mb-6">The Smarter Way To Organize</p>
      <div className="flex space-x-4 mb-8">
        <Link to="/login" className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Sign Up for Free
        </Link>
        <Link to="/dashboard" className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
          Learn More
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Powerful Features for Teams of Any Size</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Feature One</h3>
          <p className="text-gray-600">Description of feature one.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
          <p className="text-gray-600">Description of feature two.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
          <p className="text-gray-600">Description of feature three.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-2">Get Started with TaskFlow</h3>
        <p className="text-gray-600 mb-4">Join us today and start managing your tasks more efficiently.</p>
        <div className="flex space-x-4">
          <Button text="Sign Up" className="bg-blue-500 hover:bg-blue-600" />
          <Button text="Learn More" className="bg-green-500 hover:bg-green-600" />
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p>&copy; 2023 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

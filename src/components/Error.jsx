import React from 'react';
import { MdErrorOutline } from "react-icons/md";

const Error = ({error}) => {
  return error && <div className="w-full max-w-screen-md mx-auto border p-1 border-destructive bg-smoky-destructive rounded-md flex gap-2">
    <MdErrorOutline className="text-2xl" />
    <p className="font-semibold">{error}</p>
  </div>;
};

export default Error;
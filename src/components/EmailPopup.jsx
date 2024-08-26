import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import { requestPrefix, httpRequest } from '../lib/utils';

function EmailPopup({ open = undefined, setOpen, selectedStaff }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearInputs = () => {
    setName("");
    setEmail("");
    setMessage("");
    setError("");
    setSuccess("");
  }

  useEffect(() => {
    if (open === false) clearInputs()
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      clearInputs();
      const toContactID = selectedStaff.Contact_ID;
      const emailBody = {name, email, message, toContactID};
      await httpRequest(`${requestPrefix}/api/widgets/email`, 'POST', emailBody, {"Content-Type": "application/json"});
      setSuccess("Message sent successfully.")
      setTimeout(() => setOpen(false), 2000);
    } catch (error) {
      setError("Internal server error. Please try again later.");
    }
  }

  return selectedStaff && <Popup open={open} setOpen={setOpen}>
    <div className="bg-white">
      <div className="p-2 border-b-4 border-accent bg-input">
        <h1 className="text-center text-xl font-semibold">Contact {selectedStaff.Nickname}</h1>
      </div>
      <form className="p-2 grid gap-2" onSubmit={(e) => handleSubmit(e)}>
      {error && <p className="text-destructive font-semibold text-center">{error}</p>} 
      {success && <p className="text-success font-semibold text-center">{success}</p>}
        <div className="flex flex-col sm:flex-row w-full gap-2">
        <div className="grid w-full">
          <input className="bg-input p-2 rounded-sm w-full" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid w-full">
          <input className="bg-input p-2 rounded-sm" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        </div>
        <div className="grid">
          <textarea className="bg-input p-2 rounded-sm min-h-16" placeholder="Leave a message..." value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required></textarea>
        </div>
        <button className="bg-accent text-white text-lg px-4 py-1 rounded-sm w-max ml-auto" type="submit">Submit</button>
      </form>
    </div>
  </Popup>
}

export default EmailPopup
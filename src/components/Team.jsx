import React, { useState, useEffect } from 'react';
import { requestPrefix, httpRequest } from '../lib/utils';
import TeamMember from './TeamMember';
import EmailPopup from "./EmailPopup";
import Error from './Error';
import Spinner from './Loading';

const Team = ({ contacts }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [showEmailForm, setShowEmailForm] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleEmailClick = (staff) => {
    setSelectedStaff(staff);
    setShowEmailForm(true);
  }

  useEffect(() => {
    (async () => {
      if (!contacts) {
        setError("Missing required attribute: \"contacts\"");
      } else {
        const team = await httpRequest(`${requestPrefix}/api/widgets/team`, 'POST', { Contact_ID_List: contacts }, { "Content-Type": "application/json" });
        setTeamMembers(team);
      }
      setLoading(false);
    })();
  }, [contacts]);

  return <>
    <EmailPopup open={showEmailForm} setOpen={setShowEmailForm} selectedStaff={selectedStaff} />
    
    {loading && <Spinner />}
    <Error error={error} />

    {!loading && !error && <div className="w-max mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:max-w-[872px] gap-2 p-2">
      {teamMembers.map((staff, i) => (
        <TeamMember key={i} staff={staff} onEmailClick={handleEmailClick} />
      ))}
    </div>}
  </>
};

export default Team;
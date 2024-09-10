import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSwimmer,
  FaCamera,
  FaPills,
} from "react-icons/fa";
import { MdBoy, MdGirl } from "react-icons/md";
// import ContactViewEdit from "./widgets/ContactViewEdit";

// Helper function to calculate age
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const ContactCard = ({
  _id,
  firstName,
  lastName,
  email,
  phone,
  gender,
  headOfHousehold,
  birthdate,
  swimmingAbility,
  allergies,
  medication,
  photoRelease,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const hasSwimmingAbility = !!swimmingAbility;
  const hasAllergies = !!allergies;
  const hasMedication = !!medication;
  const hasPhotoRelease = photoRelease !== undefined && photoRelease !== null;

  const age = birthdate ? calculateAge(birthdate) : null;

  return (
    <>
      <button onClick={handleCardClick}>
        <div className="md:w-[340px] w-[280px] overflow-hidden shadow-lg p-6 bg-white border rounded-xl">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold">
              {firstName} {lastName}
            </h2>
            <div className="flex flex-row gap-1 items-center">
              {birthdate && (
                <>
                  {age !== null && (
                    <p className="text-gray-700 font-bold text-lg">{age}</p>
                  )}
                </>
              )}
              {gender === "Male" ? <MdBoy size={32} /> : <MdGirl size={32} />}
            </div>
          </div>

          {headOfHousehold && <p className="text-gray-700">{email}</p>}
          {headOfHousehold && <p className="text-gray-700">{phone}</p>}

          {!headOfHousehold && (
            <>
              <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex items-center mt-2 mr-2">
                  <FaSwimmer /> : <p className="ml-1">{swimmingAbility}</p>
                </div>
                <div className="flex items-center mt-2">
                  <FaPills />:
                  {hasMedication ? (
                    <FaCheckCircle className="text-green-500 ml-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 ml-2" />
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <FaCamera />:
                  {hasPhotoRelease ? (
                    <FaCheckCircle className="text-green-500 ml-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 ml-2" />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-gray-700">Allergy Note: </p>
                {hasAllergies ? (
                  <FaCheckCircle className="text-green-500 ml-2" />
                ) : (
                  <FaTimesCircle className="text-red-500 ml-2" />
                )}
              </div>
            </>
          )}
        </div>
      </button>

      {isDialogOpen &&
        {
          /* <ContactViewEdit
          _id={_id}
          onClose={() => setIsDialogOpen(false)}
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          gender={gender}
          headOfHousehold={headOfHousehold}
          birthdate={birthdate}
          swimmingAbility={swimmingAbility}
          allergies={allergies}
          medication={medication}
          photoRelease={photoRelease}
        /> */
        }}
    </>
  );
};

export default ContactCard;

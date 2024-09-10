import React, { useCallback, useEffect, useState } from "react";
import ContactCard from "./SubComponents/ContactCard";
import axios from "axios";
// import CreateHeadOfHousehold from "./forms/CreateHeadOfHouseholdForm";
// import CreateCamper from "./forms/CreateCamperForm";
import { useCookies } from "react-cookie";

const URLendpoint = "http://localhost:3000";

const HouseholdManagement = () => {
  const [householdContacts, setHouseholdContacts] = useState([]);
  const [addHeadOfHousehold, setAddHeadOfHousehold] = useState(false);
  const [addContact, setAddContact] = useState(false);

  const [loading, setLoading] = useState(true);

  const [cookies] = useCookies(["authToken", "householdId"]);
  const token = cookies.authToken;
  const household = cookies.householdId;

  // useEffect(() => {
  //   if (!cookies.authToken) {
  //     window.location.href = "/widgets/household-login";
  //   }
  // });

  const checkHouseholdIdWithToken = useCallback(
    async (force) => {
      if (!household || force) {
        try {
          const response = await axios.post(
            `${URLendpoint}/api/widgets/checkHouseholdToken`,
            {
              authToken: token,
            }
          );
          if (response.status !== 200) {
            window.location.href = "/widgets/household-login";
          }
        } catch (error) {
          console.log(error);
          window.location.href = "/widgets/household-login";
        }
      }
    },
    [token, household] // dependencies for useCallback
  );

  useEffect(() => {
    if (token && household) {
      checkHouseholdIdWithToken(false);
    } else {
      console.log(token, household);
    }
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${URLendpoint}/api/widgets/contacts`,
          {
            params: { household },
            headers: {
              "Content-Type": "Application/JSON",
              token: token,
            },
          }
        );
        setHouseholdContacts(response.data.contacts);
      } catch (error) {
        if (error.response?.status === 401) {
          checkHouseholdIdWithToken(true);
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token && household) {
      fetchContacts();
    }
  }, [token, household, checkHouseholdIdWithToken]); // Add token and household as dependencies

  const handleAddHeadOfHousehold = async (values) => {
    try {
      if (household) {
        await axios.post(`${URLendpoint}/api/widgets/createHeadOfHousehold`, {
          values,
          household,
        });
        window.location.reload();
      } else {
        window.location.href = "/widgets/household-login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCamper = async (values) => {
    try {
      if (household) {
        await axios.post(`${URLendpoint}/api/widgets/createCamper`, {
          values,
          household,
        });
        window.location.reload();
      } else {
        window.location.href = `${URLendpoint}/widgets/household-login`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading... Or missing household ID</div>
      ) : (
        <div className="md:p-16 p-4 gap-4 flex flex-col flex-wrap items-center w-full">
          <h1 className="font-bold text-xl">Parent/Guardians</h1>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {householdContacts
              .filter((contact) => contact.headOfHousehold)
              .map((contact, index) => (
                <ContactCard
                  key={index}
                  _id={contact._id}
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  email={contact.email}
                  phone={contact.phone}
                  gender={contact.gender}
                  headOfHousehold={contact.headOfHousehold}
                  birthdate={contact.birthdate}
                  swimmingAbility={contact.swimmingAbility}
                  allergies={contact.allergies}
                  medication={contact.medication}
                  photoRelease={contact.photoRelease}
                />
              ))}
          </div>
          {addHeadOfHousehold ? (
            <div>
              {/* <CreateHeadOfHousehold onSubmit={handleAddHeadOfHousehold} /> */}
              <button
                className="w-full mt-4 bg-red-500 text-white"
                onClick={() => setAddHeadOfHousehold(!addHeadOfHousehold)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="w-full bg-blue-500 text-white"
              onClick={() => setAddHeadOfHousehold(!addHeadOfHousehold)}
            >
              Add New Parent/Guardian
            </button>
          )}
          <h1 className="font-bold text-xl">Camper</h1>
          <div className="flex flex-row flex-wrap justify-center gap-4 w-full">
            {householdContacts
              .filter((contact) => !contact.headOfHousehold)
              .map((contact, index) => (
                <ContactCard
                  key={index}
                  _id={contact._id}
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  email={contact.email}
                  phone={contact.phone}
                  gender={contact.gender}
                  headOfHousehold={contact.headOfHousehold}
                  birthdate={contact.birthdate}
                  swimmingAbility={contact.swimmingAbility}
                  allergies={contact.allergies}
                  medication={contact.medication}
                  photoRelease={contact.photoRelease}
                />
              ))}
          </div>
          {addContact ? (
            <div>
              {/* <CreateCamper onSubmit={handleAddCamper} /> */}
              <button
                className="w-full mt-4 bg-red-500 text-white"
                onClick={() => setAddContact(!addContact)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="w-full bg-blue-500 text-white"
              onClick={() => setAddContact(!addContact)}
            >
              Add New Camper
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HouseholdManagement;

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const URLendpoint = "http://localhost:3000";

const HouseholdLogin = () => {
  const [contactInfo, setContactInfo] = useState("");
  const [infoExists, setInfoExists] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [isCreatingHousehold, setIsCreatingHousehold] = useState(false);

  const [cookies, setCookie] = useCookies(["authToken"]);

  useEffect(() => {
    if (cookies.authToken) {
      const authToken = cookies.authToken;
      const checkHouseholdToken = async () => {
        try {
          const data = await axios.post(
            `${URLendpoint}/api/widgets/checkHouseholdToken`,
            { authToken }
          );
          // if (data.status === 200) {
          //   window.location.href = `/household/?id=${data.data.household}`;
          // }
        } catch (error) {
          console.error("Error checking household token", error);
        }
      };
      checkHouseholdToken();
    }
  }, [cookies]);

  const checkForContactInfo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (contactInfo) {
        const householdExists = await axios.post(
          `${URLendpoint}/api/widgets/households`,
          { contactInfo }
        );
        if (householdExists.status === 200) {
          setInfoExists(true);
        } else {
          setError(
            "Something went wrong, that info doesn't exist or there is an internal error."
          );
        }
      } else {
        setError(
          "That information doesn't exist in our system yet, want to create a household?"
        );
      }
    } catch (error) {
      setError(
        "There was an error checking the information, please try again."
      );
      console.log(error);
    }
    setIsLoading(false);
  };

  const checkAuthorizationCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (authorizationCode) {
        const response = await axios.get(
          `${URLendpoint}/api/widgets/households`,
          {
            params: { authorizationCode, contactInfo },
          }
        );
        if (response.data) {
          setCookie("authToken", response.data.token, { path: "/" });
          setCookie("householdId", response.data.household);
          window.location.href = `/household/?id=${response.data.household}`;
        } else {
          setError("Invalid Code");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const createHousehold = async (values) => {
    try {
      await axios.post(
        `${URLendpoint}/api/widgets/familyAndHeadsOfHousehold`,
        values
      );
      setContactInfo(values.headsOfHousehold[0].email);
      setIsCreatingHousehold(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {isCreatingHousehold ? (
        <div className="border flex flex-col gap-2 shadow-lg p-12 rounded-xl my-20 w-[60vw]">
          <h1>
            Please create at least 1 parent/guardian then log into your
            household.
          </h1>
          {/* Replace the form component with a form implementation for collecting household info */}
          <form onSubmit={createHousehold}>
            {/* Household form elements */}
          </form>
        </div>
      ) : (
        <>
          {!infoExists ? (
            <div className="border flex flex-col gap-2 shadow-lg p-12 rounded-xl mt-20">
              <div className="flex flex-col items-center my-6">
                <h2 className="text-xl font-bold">Manage Household</h2>
                <p className="mx-2">
                  Welcome, please sign in to manage your household
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Email Address</p>
                <input
                  className="w-full"
                  type="email"
                  placeholder="Email/Number"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
                {error && <p className="text-red-300">{error}</p>}
                <button
                  onClick={checkForContactInfo}
                  disabled={!contactInfo || isLoading}
                >
                  {isLoading ? "Loading..." : "Next"}
                </button>
                <button
                  onClick={() => setIsCreatingHousehold(true)}
                  disabled={isLoading}
                  className="mt-2"
                >
                  Create New Household
                </button>
              </div>
            </div>
          ) : (
            <div className="border flex flex-col gap-2 shadow-lg p-12 rounded-xl">
              <div className="flex flex-col items-center my-6">
                <h2 className="text-xl font-bold">Authorization Code</h2>
                <p className="mx-2">
                  We just sent you an authorization code. Please enter it below:
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  6 digit authorization number (While in development the passkey
                  will be 123456)
                </p>
                <input
                  className="w-full"
                  type="text"
                  placeholder="xxxxxx"
                  value={authorizationCode}
                  onChange={(e) => setAuthorizationCode(e.target.value)}
                />
                {error && <p className="text-red-300">{error}</p>}
                <button
                  onClick={checkAuthorizationCode}
                  disabled={!authorizationCode || isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HouseholdLogin;

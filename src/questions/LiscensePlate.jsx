import { useState, useEffect } from "react";
import "../styles/forms.css";
import Banner from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import CTA from "../components/CTA";
import { LinkWithQuery } from "../components/BackButton";
import { toast } from "react-toastify";
import { userData } from "../data/userData";
import { states } from '../apis/stateList';
import axios from "axios";

const LiscensePlate = () => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [lisPlate, setLisPlate] = useState("");
  const [selectedState, setSelectedState] = useState("");

  let v = userData.lPlate;
  const navigate = useNavigate();

  useEffect(() => {
    if (v !== "") {
      setIsButtonDisabled(false);
    }
  }, []);

  const nextStep = (e) => {
    e.preventDefault();
    if (lisPlate !== "") {
      fetchLicensePlateData(lisPlate, selectedState);
    } else {
      toast.error('Please enter a valid Plate Number');
      return;
    }
  };

  async function fetchLicensePlateData(plate, state) {
    try {
      const response = await fetch(`http://localhost:3000/liscense?plate=${plate}&state=${state}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }


  return (
    <div className="bg-dark-purple pb-10">
      <Banner setProgress={33} />
      <div className="formArea flex items-center justify-top mt-20 py-5 px-4 sm:px-6 lg:px-4 flex-col">
        <div className="m-w-1/2 space-y-8">
          <div>
            <h2 className="mt-4 text-center text-4xl font-extrabold text-white">
              What Is Your Vehicle{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 xl:inline">
              Liscence Plate {' '}
              </span>
              & {' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 xl:inline">
               State
              </span>
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className=" space-y-6 flex flex-col  items-center justify-center">
              <div className="justify-center w-full">
                <input
                  type="text"
                  name="plate"
                  id="plate"
                  placeholder="XXX XXXX"
                  required
                  onChange={(e) => setLisPlate(e.target.value)}
                  className="w-full lg:text-xl text-center bg-input-purple text-white text-md rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-5 p-2.5"
                />
              </div>

              <div className="justify-center w-full">
               

                <select className="w-full lg:text-xl text-center bg-input-purple text-white text-md rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-5 p-2.5" onChange={(e) => setSelectedState(e.target.value)}>
                  
                <option disabled selected value>-- Choose a state --</option>

        {states.map(state => (
          <option key={state.key} value={state.value}>{state.title}</option>
        ))}
      </select>

                {/* make a select with all US states as abbrivations as well as its values */}

              </div>

              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`px-6 py-4 max-w-xl w-full  mt-5 text-lg bg-pink-600 ${
                  isButtonDisabled
                    ? "cursor-not-allowed disabled:opacity-75  bg-input-purple"
                    : ""
                } hover:shadow-lg text-white rounded transition duration-200`}
                id="zipCodeButton"
                onClick={nextStep}
              >
                Next
              </button>
            </div>

            <LinkWithQuery to="/address">Back</LinkWithQuery>
          </form>
        </div>
      </div>
      <CTA />
    </div>
  )
}

export default LiscensePlate
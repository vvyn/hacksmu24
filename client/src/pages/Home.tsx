import { Container, Image, Text } from "@mantine/core";
import { MantineProvider } from '@mantine/core';
import classes from './Home.module.css';
import './Home.css';
import { useEffect, useState } from "react";
import { getUser } from "../api";
import { getCookie } from "../cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const username = getCookie("username");
      const data = await getUser(username);
      setUser(data);
    }

    fetchData();
  }, []);

  const goToProfile = () => {
    navigate('/me');
  };

  const goToAddHabit = () => {
    navigate('/addHabit');
  };

  const goToChallengeProgress = () => {
    navigate('/ChallengeProgress'); // Navigate to ChallengeProgress page
  };

  if (user === null) {
    return null; // Ensure this returns null instead of undefined
  }

  return (
    <>
      <MantineProvider>
        <Container size="md" className="font-poppins">
          <div className={classes.inner}>
            <div className={classes.content}>
              <div className="flex flex-row">
                <Text className={classes.welcomeText + " font-poppins"}>
                  Welcome back, {' '}
                  <Text
                    component="span"
                    inherit
                    c='blue'
                  >
                    {user.name}!
                  </Text>
                </Text>
                <div>
                  <button onClick={goToProfile} className="w-[50px] h-[50px] p-0 bg-transparent">
                    <img src="profile.png" alt="Profile" className={classes.profile} width={50} height={50} />
                  </button>
                </div>
              </div>
              <div className="text-xl text-[#877B8C] font-poppins">
                Congrats on completing your daily check in
              </div>
              <div className={classes.rectangle + " p-0"} >
                <Image
                  src="/corgiEarWag.gif"
                  alt="Corgi"
                  width={100}
                  height={100}
                  className={classes.corgi}
                  mt="lg"
                />
                <div className="corg">
                  <Text className="corgText">Total Breathe Count:</Text>
                  <Text className="corgText2">15 days</Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </MantineProvider>

      <div>
        <div>
          <span className="text-lg font-semibold mb-4">Current Challenges</span>
          <span className="ml-28 font-semibold text-[#E13A50]">View All</span>
        </div>

        <div className="mx-8 rounded-2xl py-4 mt-4">
          <div onClick={goToChallengeProgress} style={{ cursor: 'pointer' }}>
            <img className="" src="/Productive.png" alt="Habit Card" />
          </div>
        </div>

        <div className="pt-4">
          <span className="text-lg font-semibold mb-4">Challenges</span>
          <span className="ml-44 font-semibold text-[#E13A50]">View All</span>
        </div>
        <div className="px-8 py-4">
          <img className="productive" src="/Productive.svg" alt="Productive" />
          <br />
          <img className="walk" src="/Walk.svg" alt="Walk" />
        </div>
        <button onClick={goToAddHabit} className="w-3/4 mx-4 mt-4 rounded-full py-3 text-white bg-gradient-to-br from-[#1D95F4] to-[#5AD7F5]">
          Add Habit
        </button>

        <div className="mt-4">
          <div className="text-lg font-semibold mb-4">Resources</div>
          <div className="flex m-2">
            <div className="w-1/3 m-1 rounded-xl p-2 bg-gradient-to-br from-[#F15469] to-[#F57069]">
              <div className="text-white text-lg">Looking for counseling services?</div>
              <div className="rounded-lg px-2 m-2 bg-white text-[#F15469] text-sm">
                <a href="https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/counseling-services/mentalhealthapps/smu-teletherapy">
                Go to DMU health portal
                </a>
              </div>
            </div>
            <div className="w-1/3 m-1 rounded-xl p-2 bg-gradient-to-br from-[#F15469] to-[#F57069]">
              <div className="text-white text-lg mb-6">Primary Care Services</div>
              <div className="rounded-lg px-2 m-2 bg-white text-[#F15469] text-sm">
                <a href="https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/medical-services">
                  More information here
                </a>
              </div>
            </div>
            <div className="w-1/3 m-1 rounded-xl p-2 bg-gradient-to-br from-[#F15469] to-[#F57069]">
              <div className="text-white text-lg">Looking for fitness services?</div>
              <div className="rounded-lg px-2 m-2 bg-white text-[#F15469] text-sm">
                <a href="https://www.smu.edu/studentaffairs/campusrecreation/programs/fitness">
                  Go to DMU health portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

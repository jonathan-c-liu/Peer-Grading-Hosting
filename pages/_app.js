import './styles.css'
import React, { useState } from 'react';
import Header from '../components/header'
import Navbar from '../components/navbar'
import WorkingNav from '../components/workingnav'
import GoogleFonts from "next-google-fonts";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Styles from './toggle.module.css'


export default function MyApp({ Component, pageProps }) {
  const [isstudent, setisstudent] = useState(false);

  const handleUser = (event, view) => {
    if (view === 'prof/ta') {
      setisstudent(false)
    }
    else {
      setisstudent(true)
    }
  };

  function UserView(){
    return(
      <ToggleButtonGroup exclusive onChange={handleUser} aria-label="State" className={Styles.tog}>
        <ToggleButton value="student" aria-label="student">
          Student
        </ToggleButton>
        <ToggleButton value="prof/ta" aria-label="prof/ta">
          Prof/TA
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }

  return (
    <div>
      <GoogleFonts href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Header />
      <UserView/>
      <Navbar ISstudent={isstudent} />
      <Component ISstudent={isstudent} {...pageProps} />
      <WorkingNav ISstudent={isstudent} />
    </div>

  )
};


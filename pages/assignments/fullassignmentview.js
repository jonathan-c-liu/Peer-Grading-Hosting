import React from "react";
import styles from "./fullassignmentview.module.css";
import Container from "../../components/container";
import Attributes from "../../components/assignmentattributes";
import FullDetails from "../../components/fullassignmentdetails";
import Checklist from "../../components/assignmentchecklist";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useSWR from "swr";

const fetcher = url => fetch(url, { method: "GET" }).then(r => r.json());

const FullAssignment = () => {
  // For future reference:
  // const data = [
  //   {'name': '', 'info':""},
  //   {'name': '', 'info':""},
  // ];

  return (
    <div className="Content">
      <Container name="Assignment Details">
        <div className={styles.view}>
          <div className={styles.att}>
            <Attributes />
          </div>
          {/* <div className={styles.inf}> */}
          <Accordion className={styles.inf}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FullDetails />
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          {/* </div> */}
          <div className={styles.check}>
            <Checklist />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FullAssignment;

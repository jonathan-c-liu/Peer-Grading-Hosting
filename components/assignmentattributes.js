import React from "react";
import Link from 'next/link'
import Container from './container'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class assignmentattributes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // :[
        //   {'name': '', 'info':""},
        //   {'name': '', 'info':""},
        // ],
      }
    }
    render() {
    //   const = this.state
    return (
      <List>
        <ListItem>Submission Type:</ListItem>
        <ListItem>Group Assignment:</ListItem>
        <ListItem>Assignment Due:</ListItem>
        <ListItem>Reviews Due:</ListItem>
        <ListItem>Appeals Due:</ListItem>
      </List>
    )
    }
  }
  
  export default assignmentattributes;
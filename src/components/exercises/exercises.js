import Button from "@mui/material/Button";
import * as React from 'react';
import Alert from '@mui/material/Alert';

export function Exercises(){

    /* function quitFunction(){
        <Alert severity="info">This is an info alert — check it out!</Alert>
    } */
    const handleClick = () => {
        alert('Do you want to see your scores before you go?');window.location = '/scores.jsx';
      // alert( <Alert severity="info">This is an info alert — check it out!</Alert>);
    };
    
    return(
    <div>
    exercises: 
    <div>
          {/* <Button onClick={() => <Alert severity="info">This is an info alert — check it out!</Alert> }>
            QUIT
          </Button> */}
         <Button onClick = {handleClick}>QUIT</Button> 
        </div>
    </div>
    );
}
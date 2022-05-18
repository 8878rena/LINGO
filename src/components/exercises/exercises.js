import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import React, {useState, useContext, useEffect} from "react";
import {Context} from '../App/App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { ConstructionOutlined, PanoramaPhotosphere } from "@mui/icons-material";


const exerciseQuestions = [{question: "I ate the ___________", answers: "apple, dog, run, trip"}];
    
export function Exercises(){
  const navigate = useNavigate();
  //const [language, setLanguage] = useState("");
  const {language, setLanguage} = useContext(Context);
  //console.log(setLanguage)
  //const [value, setValue] = React.useState('');
  const [outputValueString, setOutputValueString] = React.useState();
  const [outputValueArray, setOutputValueArray] = React.useState(["apple", "dog", "run", "trip"]);

  const [currIndex, setCurrIndex] = React.useState(0);
  const [currQuestion, setCurrQuestion] = React.useState(exerciseQuestions[currIndex]);


    /* function quitFunction(){
        <Alert severity="info">This is an info alert — check it out!</Alert>
    } */
    function translateSentence(){
      const encodedParams = new URLSearchParams();
      console.log("in fetch")
      console.log(currQuestion.answers);
encodedParams.append("q", currQuestion.answers);
encodedParams.append("target", language.language);
encodedParams.append("source", "en");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
		'X-RapidAPI-Key': 'f171fa75a4mshc549608b005200dp1ae02ejsn2ee73b5f5dab'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
.then(response => response.json())
.then((response) =>  setOutputValueString(response.data.translations[0].translatedText))
.then(() => setOutputValueArray(outputValueString.split(",")))
//.then((response) => console.log(response.data.translations[0].translatedText))
//.then(response => console.log(response))
.catch(err => console.error(err));
//setOutputValueArray(outputValueString.split(","));
console.log(outputValueString);
  
    }

    const handleClick = () => {
        alert('Do you want to see your scores before you go?');window.location = '/scores';
      // alert( <Alert severity="info">This is an info alert — check it out!</Alert>);
    };

   
    return(
    <div>
    exercises:
    <div>
      {currQuestion.question}
      {/* {value} = 'apple  dog  trip  run'  */}
      
      <div>{outputValueArray}</div>
    </div> 
    <AnswerRadio currQuestion={currQuestion}  translateSentence={translateSentence} outputValueArray={outputValueArray}/>
    {/* <Button size="medium" onClickCapture={()=>translateSentence()}>I'M READY!</Button> */}
    <div>
          {/* <Button onClick={() => <Alert severity="info">This is an info alert — check it out!</Alert> }>
            QUIT
          </Button> */}
         <Button onClick = {handleClick}>QUIT</Button> 
        </div>
    </div>
    );
}
function AnswerRadio(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [translatedAnswers, setTranslatedAnswers] = React.useState([]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'best') {
      setHelperText('You got it!');
      setError(false);
    } else if (value === 'worst') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  
  // useEffect(() =>{
  //   // props.currQuestion.answers.map( (answer, index) => {
  //   //     props.translateSentence(answer);
  //   //     const tempTranslations =[...translatedAnswers];
  //   //     const newValue = props.outputValue;
  //   //     console.log(newValue);
  //   //     const tempTranslations2 = [...tempTranslations, props.outputValue];
  //   //     console.log(props.outputValue);
  //   //     setTranslatedAnswers(tempTranslations2);
  //   // })
  //   props.translateSentence();
  //   console.log(translatedAnswers);
  // },[]);

  function loadAnswers(){
    props.translateSentence();
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button onClick={() => loadAnswers()}>load answers</Button>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
    
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
           
          {/* {translatedAnswers.map((answer, index) => {
             <FormControlLabel key={index} value="hi" control={<Radio />} label="The best!" />
})}

          <FormControlLabel value="worst" control={<Radio />} label="The worst." /> */}

                    {/* {props.outputValue.map((answer, index) => {
             <FormControlLabel key={index} value={answer} control={<Radio />} label="The best!" />
})} */}
          
          {props.outputValueArray.length === 0 ? ( <div>Loading</div> ): (
            <div>
          <FormControlLabel value="1" control={<Radio />} label={props.outputValueArray[0]} />
          
          <FormControlLabel value="2" control={<Radio />} label={props.outputValueArray[1]} />
          
          <FormControlLabel value="3" control={<Radio />} label={props.outputValueArray[2]} />
          
          <FormControlLabel value="4" control={<Radio />} label={props.outputValueArray[3]} />
          </div> )
        }
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" >
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}
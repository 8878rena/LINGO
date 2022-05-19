import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import React, {useState, useContext, useEffect} from "react";
import {Context} from '../App/App';
import {Context2} from '../App/App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { ConstructionOutlined, PanoramaPhotosphere } from "@mui/icons-material";


const exerciseQuestions = [{question: "I ate the ___________.", answers: "apple, dog, run, trip", correct: "1"},
{question: "I ___________ the pink one.", answers: "happy, Samuel, pretend, like", correct: "4"},
{question: "The house was ___________ the park.", answers: "people, near, family, silly", correct: "2"},
{question: "The boys were ___________ with the ball.", answers: "head, they, playing, is", correct: "3"},
{question: "I feel ___________ when I hear bad news.", answers: "happy, sad, funny, big", correct: "2"},
{question: "It is nice and ___________ outside!", answers: "sunny, group, chat, wonder", correct: "1"},
{question: "The game was ___________", answers: "hate, fork, fun, brother", correct: "3"},
{question: "What is your ___________?", answers: "hair, desk, shirt, name", correct: "4"},
{question: "The boys and girls ___________ tired.", answers: "was, were, will, when", correct: "2"},
{question: "The cake was completely ___________.", answers: "finished, sun, tomorrow, next", correct: "1"}
];
    
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
  const [pointCounter,setPointCounter]=useState(0);


    /* function quitFunction(){
        <Alert severity="info">This is an info alert — check it out!</Alert>
    } */
   /* useEffect(() => {
      translateSentence();
    },[])*/
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
		'X-RapidAPI-Key': '126d7a90d8msh004942d9af48c13p137cbajsncbc18b6375f5'
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
        alert('Do you want to see your scores before you go?');window.location = 'scores#/scores';
      // alert( <Alert severity="info">This is an info alert — check it out!</Alert>);
    };

   
    return(
    <div>
    
    <div class="question"> 
      {currQuestion.question}
      {/* {value} = 'apple  dog  trip  run'  */}
      <div>Points: {pointCounter}</div>
      {/* <div>{outputValueArray}</div> */}
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
  const [helperText, setHelperText] = React.useState('');
  const [translatedAnswers, setTranslatedAnswers] = React.useState([]);
  const {score, setScore} = useContext(Context2);


  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === props.currQuestion.correct) {
      setHelperText('You got it!');
      setScore(score +1);
      setError(false);
    } else if (value !== props.currQuestion.correct && value !== null) {
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
  function loadQuestion(){

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
      {/* <Button onClick={()=> loadNextQuestion}>NEXT QUESTION</Button> */}
    </form>

  );
}
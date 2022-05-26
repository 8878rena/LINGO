import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../App/App";
import { Context2 } from "../App/App";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const exerciseQuestions = [
  {
    question: "I ate the ___________.",
    answers: "apple, dog, run, trip",
    correct: "1",
  },
  {
    question: "I ___________ the pink one.",
    answers: "happy, Samuel, decide, want",
    correct: "4",
  },
  {
    question: "The house was ___________ the park.",
    answers: "people, next to, family, silly",
    correct: "2",
  },
  {
    question: "The boys were ___________ with the ball.",
    answers: "head, they, playing, is",
    correct: "3",
  },
  {
    question: "I feel ___________ when I hear bad news.",
    answers: "happy, sad, funny, big",
    correct: "2",
  },
  {
    question: "The game was ___________",
    answers: "hate, fork, fun, brother",
    correct: "3",
  },
  {
    question: "What is your ___________?",
    answers: "hair, desk, shirt, name",
    correct: "4",
  },
  {
    question: "The boys and girls ___________ tired.",
    answers: "was, were, will, when",
    correct: "2",
  },
  {
    question: "The cake was completely ___________.",
    answers: "finished, sun, tomorrow, next",
    correct: "1",
  },
];


export function Exercises() {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(Context);
  const [outputValueString, setOutputValueString] = React.useState();
  const [outputValueArray, setOutputValueArray] = React.useState([
    "apple",
    "dog",
    "run",
    "trip",
  ]);

  const [currIndex, setCurrIndex] = React.useState(0);
  const [currQuestion, setCurrQuestion] = React.useState(
    exerciseQuestions[currIndex]
  );
  const {score, setScore } = useContext(Context2);
  
   
  function translateSentence() {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", currQuestion.answers);
    encodedParams.append("target", language.language);
    encodedParams.append("source", "en");

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        "X-RapidAPI-Key": 'febe9083afmshfb1adff99f34a49p127917jsnc93b5a839611',
      },
      body: encodedParams,
    };

    fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setOutputValueString(response.data.translations[0].translatedText)
      )
      .then(() => setOutputValueArray(outputValueString.split(",")))
     
      .catch((err) => console.error(err));
  }

  const handleClick = () => {
    alert("Do you want to see your scores before you go?");
    window.location = "scores#/scores";
  
  };
  function nextQ()  {
    setCurrIndex(currIndex +1);
    setCurrQuestion(exerciseQuestions[currIndex]);
  }

  return (
    <div>
      
      <Box
        sx={{
          display: 'flex',
          m: 1,
          p: 1,
          flexDirection: 'row-reverse'
        }}
      >
        <Card sx={{ minWidth: 275, justifySelf: "right", justifyContent: "right" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          POINTS:
        </Typography>
        <Typography variant="h5" component="div">
         {score}
        </Typography>
        
      </CardContent>
      
    </Card>
    </Box> 
    
    <Box
     sx={{
      display: 'flex',
      m: 1,
      p: 1,
      flexDirection: 'row',
      
    }}>
 <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
        <Typography variant="h5">{currQuestion.question}</Typography>

        </div>
      </Box>
      <AnswerRadio
        currQuestion={currQuestion}
        translateSentence={translateSentence}
        outputValueArray={outputValueArray}
      />
      <div>
      <Button onClick={()=>nextQ()}>NEXT QUESTION</Button>
      <Box
        sx={{
          display: 'flex',
          m: 1,
          p: 1,
          flexDirection: 'row-reverse',
          fontWeight: '1000'
        }}
      > 
        <Button onClick={handleClick}>QUIT</Button>
  </Box>
        
      </div>
    </div>
  );
}
function AnswerRadio(props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [translatedAnswers, setTranslatedAnswers] = React.useState([]);
  const {score, setScore } = useContext(Context2);
  const [showAnswers, setShowAnswers] = useState(false);
  
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === props.currQuestion.correct) {
      setHelperText("You got it!");
      setScore(score + 1);
      setError(false);
    } else if (value !== props.currQuestion.correct && value !== null) {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  

  function loadAnswers() {
    props.translateSentence();
    props.translateSentence();
    setShowAnswers(true);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Button onClick={() => loadAnswers()}>load answers</Button>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">



        {showAnswers && (
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
           

            {props.outputValueArray.length === 0 ? (
              <div>Loading</div>
            ) : (
              <div>
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={props.outputValueArray[0]}
                />

                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={props.outputValueArray[1]}
                />

                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={props.outputValueArray[2]}
                />

                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label={props.outputValueArray[3]}
                />
              </div>
            )}
          </RadioGroup>
        )}
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
      
     
    </form>
  );
}

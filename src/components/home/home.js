import React, {useState, useContext} from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
//import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Context} from '../App/App';
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { Context2 } from "../App/App";

export function Home() {
  const navigate = useNavigate();
  //const [language, setLanguage] = useState("");
  const {language, setLanguage} = useContext(Context);
  //console.log(setLanguage)
  const [allLanguages, setAllLanguages] = useState([{}]);
  const [value, setValue] = React.useState('');
  const [outputValue, setOutputValue] = React.useState('');
  const {score, setScore } = useContext(Context2);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setScore(0);
    console.log(language);
  };

  function loadLang() {
    const options = {
      method: "GET",
      headers: {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': '793e7544cfmshc86b84a64c474cep19d526jsnbfc5630f0ae8'
      }
    };

    fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
      options
    )
      .then((response) => response.json())
      .then((response) => setAllLanguages(response.data.languages))

      .catch((err) => console.error(err));
  }


function translateSentence(){
    const encodedParams = new URLSearchParams();
    // encodedParams.append("q", value);
    // encodedParams.append("target", language);
    encodedParams.append("q", value);
    encodedParams.append("target", language.language);
    encodedParams.append("source", "en");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
		'X-RapidAPI-Key': '793e7544cfmshc86b84a64c474cep19d526jsnbfc5630f0ae8'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)

	.then(response => response.json())
  .then((response) => setOutputValue(response.data.translations[0].translatedText))
	//.then(response => console.log(response.data.translations[0].translatedText))
	.catch(err => console.error(err));

  }


  return (
    <div>
      {/* <Button onClick={()=>loadLang()}>Try Me</Button>
    <div>{allLanguages.map((item, index) =>
      <div key={index}>{item.language}</div>
    )}</div> */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select a language
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Age"
            onChange={handleLanguageChange}
            onOpen={loadLang}
          >
            {allLanguages.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item.language}
              </MenuItem>
            ))}
            {/* (<div key={index}>{item.language}</div>)} */}
          </Select>
        </FormControl>
        <div>
          <Button onClick={() => navigate("/exercises")}>
            Get Started{" "}
          </Button>
        </div>
      </Box>


      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
          TRANSLATE A SENTENCE
        </Typography>
        <div>
        <TextField sx={{width: "90%"}}
          id="outlined-multiline-flexible"
          label="Translate"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
        />
        </div>
        {/* {<Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
          <div>{outputValue.map((item, index) =>
      <div key={index}>{item.translations}</div>
    )}</div>
        </Typography>} */}
        
      </CardContent>
      <CardActions>
        <Button size="medium" onClickCapture={()=>translateSentence()}>Translate</Button>
      </CardActions>
      <div>{outputValue}</div>
    </Card>
    </div>
  );
}


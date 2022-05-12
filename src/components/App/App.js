import './App.css';
import React, {useState} from "react";
import {Header} from '../header/header';
import {Home} from '../home/home';
import {Exercises} from '../exercises/exercises';
import {Scores} from '../scores/scores';
import {
  HashRouter,
  Routes,
  Route,
  } from "react-router-dom";

export const Context = React.createContext("");


function App() {
  const [language, setLanguage] = useState("");
  return (
    <div>
      <Context.Provider value = {{language, setLanguage}} >
    <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/scores" element= {<Scores />}></Route>
        </Routes>
      </HashRouter></Context.Provider>
      </div>
  );
}

export default App;

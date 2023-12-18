import React, { useState } from 'react';
import './App.css';
import logo from './atlas-logo-rgb.svg';
import AdTemplate from './models/AdTemplate';

const defaultTemplate: AdTemplate = {
  headline1: "{airline} deals[. Save Big]",
  headline2: "Book Now & Save",
  description1: "Book {airline} to {destination}. Pay Less. Save More!",
  path1: "Flights",
  path2: "[to_]{destination}",
}

function App() { 
  const [template, setTemplate] = useState<AdTemplate>(defaultTemplate);

  return (
    <div className="app">
      <img src={logo} className="app-logo" alt="logo" />
      <div className="ad-template">
        <form>
          <div className="form-field">
            <label>Headline1</label>
            <input value={template.headline1} onChange={(e) => setTemplate({...template, headline1: e.target.value})}/>
          </div>
          <div className="form-field">
            <label>Headline2</label>
            <input value={template.headline2} onChange={(e) => setTemplate({...template, headline2: e.target.value})}/>
          </div>
          <div className="form-field">
            <label>Description</label>
            <input className="long-input" value={template.description1} onChange={(e) => setTemplate({...template, description1: e.target.value})}/>
            </div>
          <div className="form-field">
            <label>Path</label>
            <input className="short-input" value={template.path1} onChange={(e) => setTemplate({...template, path1: e.target.value})}/>
            &nbsp;/&nbsp;
            <input className="short-input" value={template.path2} onChange={(e) => setTemplate({...template, path2: e.target.value})}/>
            </div>
        </form>
      </div>
    </div>
  );
}

export default App;

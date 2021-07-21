import React from 'react';
import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'ru-RU';

const VoiceRecognitionButton = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [text, setText] = useState();

  var buttonColour;
  var buttonLabel;

  if (isMicOn) {
    buttonColour = 'secondary';
    buttonLabel = 'Recording...';
  } else {
    buttonColour = 'primary';
    buttonLabel = '🎙';
  }
  async function fetchToSmartDevice(command){
    if(command === 'включитьлампу'){
        try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/lamp/on"}
          ),
        })
      } catch (error) {
        console.log(error);
      }            
    }    
    else if (command === 'выключитьлампу'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/lamp/off"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'включитьсветодиод'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/led/on"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'выключитьсветодиод'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/led/off"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'включитьреле'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/relay/on"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'выключитьреле'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/relay/off"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'включитьленту'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/strip/on"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'выключитьленту'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/strip/off"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'включитьбойлер'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/boiler/on"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'выключитьбойлер'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/boiler/off"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'веселье'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/fun/on"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
    else if (command === 'выключитьвеселье'){
      try {
        await fetch(process.env.REACT_APP_RASPBERRY_API,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(
            {api: process.env.REACT_APP_SMART_DEVICE_API+"/fun/off"}
          ),
        })        
      } catch (error) {
        console.log(error);    
      }
    }
  }

  useEffect(() => {
    handleListen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMicOn]);

  const handleListen = () => {
    if (isMicOn) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
        console.log('>>>>',text);
        fetchToSmartDevice(text.toLowerCase().split(' ').join(''))
        // fetch(`http://192.168.1.148:3001/api/rpi/${text}`)
      };
    }
    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setText(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  return (
    <Button
      variant="contained"
      color={buttonColour}
      onClick={() => {
        setIsMicOn(!isMicOn);
      }}
    >
      {buttonLabel}
    </Button>
  );
};
export default VoiceRecognitionButton;

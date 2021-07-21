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

  useEffect(() => {
    handleListen();
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

import React from "react";

const useSocket = (url: string) => {
  const [serverState, setServerState] = React.useState("Loading...");
  const [messageText, setMessageText] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
  const [serverMessages, setServerMessages] = React.useState([]);
  const ws = React.useRef(new WebSocket(`ws://${url}`)).current;

  React.useEffect(() => {
    const serverMessagesList = [];
    ws.onopen = () => {
      setServerState("Connected to the server");
      setDisableButton(false);
    };
    ws.onclose = (e) => {
      setServerState("Disconnected. Check internet or server.");
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      setServerState(e.message);
    };
    ws.onmessage = (e) => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);
  const submitMessage = () => {
    ws.send(messageText);
    setMessageText("");
    setInputFieldEmpty(true);
  };
  return { submitMessage };
};

export default useSocket;

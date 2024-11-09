import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
import flaskAxios from "../../axios/flask";
import { useSelector } from "react-redux";



const Sidebar = styled(Paper)(({ theme }) => ({
  height: "70vh",
  padding: theme.spacing(2),
  overflowY: "auto",
  display: "block",
}));

const Message = styled("div")(({ theme, type }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: "8px",
  maxWidth: "80%",
  backgroundColor: type === "user" ? "#73EC8B" : "#D2FF72",
  color: "#000000",
  fontSize: "18px",
  alignSelf: type !== "user" ? "flex-start" : "flex-end",
  width: "fit-content",
}));

const ChatBox = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
});

const Input = styled(InputBase)({
  flex: 1,
  marginRight: "8px",
  borderRadius: "8px",
});

const IconButtonStyled = styled(IconButton)({
  color: "#757575",
});

const Conversation = styled("div")({
  height: "460px",
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
});

const ButtonContainer = styled(Box)`
  margin-top: 75px;
  display: flex;
  justify-content: space-around;
  padding: 0 5px;
  margin-bottom: 20px;
  // background : #0071dc;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #0071dc;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
`;

const Flask_API_URL = "http://localhost:5000";

function Chat() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { user } = useSelector((state) => state.user);
  const conversationEndRef = useRef(null);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };



  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await flaskAxios.post("/get_image_id", {
        imageUrl: url,
      });
      setProductId(response.data.image_id);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSend = async () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        text: inputText,
        type: "user",
      };
      setMessages([...messages, newMessage]);
      setInputText("");

      // Send user message to Rasa server
      try {
        const response = await axios.post(
          `${Flask_API_URL}/conversation`,
          {
            sender: user.userId,
            message: inputText,
          }
        );

        const botResponse = response.data.response;

        if (botResponse.startsWith("http")) {
          const newBotMessage = {
            type: "bot",
            image: botResponse,
          };
          fetchData(botResponse);
          setMessages((messages) => [...messages, newBotMessage]);
        } else {
          const newBotMessage = {
            text: botResponse,
            type: "bot",
          };
          setMessages((messages) => [...messages, newBotMessage]);
        }

      } catch (error) {
        console.error("Error sending message to Rasa:", error);
      }
    }
  };

  const handleVoice = async () => {
    if (!listening) {
      await SpeechRecognition.startListening();
      setInputText(transcript);
    } else {
      SpeechRecognition.stopListening();
      setInputText("");
      resetTranscript();
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleClearChat = async () => {
    try {
      await axios.post(`${Flask_API_URL}/clear_chat`, { userId: user.userId });
      setMessages([]);
      // clear side bar as well
      setProductId("");
    } catch (err) {
      console.error("Error clearing chat history:", err);
    }
  };

  return (
    <>
      <ButtonContainer>
        {/* Add your buttons here */}
        <Link to="/">
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: '#73EC8B', color: 'black' }}
          >
            Ask AI 🤖
          </Button>
        </Link>
        <Link to="/home">
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: '#73EC8B', color: 'black' }}
          >
            Explore 🔍
          </Button>
        </Link>
      </ButtonContainer>
      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Sidebar>
              {loading && (
                <Message type="bot">
                  Loading... Please wait while we fetch the same product for you
                  we have.
                </Message>
              )}
              {productId && (
                <>
                  <Message type="bot">
                    Here is the product available with us.
                  </Message>
                  <Link to={`/home/product/${productId}`}>
                    <img
                      // src={`https://fashionkart.blob.core.windows.net/test/$// {productId}.jpg`}
                      src={`http://localhost:8000/product_images/images/${productId}.jpg`}
                      alt="Generated image"
                      style={{ height: "200px", width: "200px" }}
                    />
                    {/* <ViewAllButton variant="contained">View Product</ViewAllButton> */}
                    <a
              
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                backgroundColor: "#15B392",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              Visit Product Page
            </a>
                  </Link>

                </>
              )}
            </Sidebar>
          </Grid>
          <Grid item xs={9}>
            <Conversation>
              <Message>
                Social Media Trends fetched!
              </Message>
              <Message>
                <strong>Use: </strong><br></br>
                <strong>/recommend:</strong> Get recommendations based on your input <br></br>
                <strong>/generate:</strong> Generate an outfit based on your conversation <br></br>
              </Message>
              <Message>
                Hi there! I'm your personal stylist. I can help you find the
                perfect outfit for any occasion. Just ask me anything!
              </Message>
              {messages.map((message, index) => (
                <Message key={index} type={message.type}>
  {/* Check if message contains an image */}
  {message.image ? (
    <img
      src={message.image}
      alt="Generated Outfit"
      style={{ maxWidth: "60%", height: "auto" }}
    />
  ) : (
    typeof message.text === "string" ? (
      message.text.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line.includes("[View Image]") ? (
            // Extract the URL from the text and create a clickable "View Image" link
                        <img
              src={line.match(/\((.*?)\)/)[1]} // Extract the URL inside parentheses
              alt="Outfit Image"
              style={{ maxWidth: "25%", height: "auto", margin: "10px 0" }}
            />
          ) : line.includes("[View on Amazon]") ? (
            // Extract the URL from the text and create a clickable "View on Amazon" link
<a
              href={line.match(/\((.*?)\)/)[1]} // Extract URL inside parentheses
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                backgroundColor: "#15B392",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              View on Amazon
            </a>
          ) : (
            // Handle normal text with bold formatting for **bold**
            line.split(/(\*\*.*?\*\*)/).map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )
          )}
          <br />
        </React.Fragment>
      ))
    ) : (
      JSON.stringify(message.text)
    )
  )}
</Message>

              ))}
              <div ref={conversationEndRef} />
            </Conversation>
            <ChatBox>
              <Input
                placeholder="Type your message..."
                fullWidth
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <IconButtonStyled onClick={handleSend}>
                <SendIcon />
              </IconButtonStyled>
              {/* <IconButtonStyled onClick={handleVoice}>
                <MicIcon color={listening ? "primary" : "inherit"} />
              </IconButtonStyled> */}
              <IconButtonStyled onClick={handleClearChat}>
                <DeleteIcon />
              </IconButtonStyled>
            </ChatBox>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Chat;

import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Snackbar } from "material-ui";
import "./Chatroom.css";
import axios from "axios";
import Message from "./Message";



class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatroomId: props.chatroomId,
      uid: props.uid,
      name: props.name,
      chatroomName: props.chatroomName,
      chats: [],
      myImg: props.myImg,
      ms: 0,
      numPrevMsgs: 0,
      numMsgs: 0,
      newMessage: false,
      blockedUsers: []
    };
    this.interval = setInterval(this.tick, 500);
    // console.log(props)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.state.currChatName != nextProps.state.currChatName) {
      this.setState(
        {
          chatroomId: nextProps.state.currChat,
          chatroomName: nextProps.state.currChatName
        },
        this.componentDidMount
      );
    }
  };

  componentDidMount = () => {
    let that = this;
    if (this.state.chatroomId != "" || this.state.chatroomId != null) {
      axios
        .post("/GET-CHATROOM", {
          userID: this.state.uid
        })
        .then(response => {
          // let chatroomList = response.data;
          if (response.data[this.state.chatroomId] != null) {
            that.setState(
              {
                chatroomName: response.data[this.state.chatroomId]
              } /*, () => console.log(that.state.chatroomName)*/
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    axios
      .post("GET-BLOCKED-USERS", {
        userID: this.state.uid
      })
      .then(response => {
        let blockedList = [];
        for (let blocked in response.data) {
          blockedList.push(response.data[blocked]);
        }
        this.setState({
          blockedUsers: blockedList
        });
      })
      .catch(error => {
        console.log(error);
      });

    //console.log("Chatroom Name: " + this.state.chatroomName);
    if (this.state.chatroomName != null && this.state.chatroomName != "") {
      axios
        .post("/GET-MESSAGES", {
          chatroomName: that.state.chatroomName,
          userID: this.state.uid
        })
        .then(response => {
          if (response.data.status == false) {
            alert("Chat room no longer available, please choose another one");
            this.props.changeNeedToUpdate();
          } else {
            let messages = response.data;
            let chatroomMessages = [];
            for (let m in messages) {
              if (m != "" && m != null && m != "number") {
                let messageContent = messages[m].split("$:$");
                let flag = false;
                for (let blocked in this.state.blockedUsers) {
                  if (messageContent[0] == this.state.blockedUsers[blocked]) {
                    flag = true;
                  }
                }
                if (flag != true) {
                  chatroomMessages.push(
                    <Message
                      key={m}
                      chat={{
                        uid: messageContent[0],
                        name: messageContent[1],
                        img: messageContent[2],
                        content: messageContent[3]
                      }}
                      uid={that.state.uid}
                      name={that.state.name}
                      image={that.state.myImg}
                      style={{ wordWrap: "break-all" }}
                    />
                  );
                }
              }
            }
            if (that.state.chats != chatroomMessages) {
              that.setState({ chats: [] }, () => {
                that.setState({
                  chats: chatroomMessages,
                  inputText: "",
                  numPrevMsgs: this.state.numMsgs,
                  numMsgs: chatroomMessages.length
                });
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (this.state.numPrevMsgs == 0) {
      this.scrollToBottomInstant();
    }

    if (
      this.state.numMsgs > this.state.numPrevMsgs &&
      this.state.numPrevMsgs != 0
    ) {
      if (
        this.state.chats[this.state.chats.length - 1].props.chat.uid !=
        this.state.uid
      ) {
        this.setState({
          newMessage: true
        });
      } else {
        this.scrollToBottom();
      }
    }
  };

  tick = () => {
    this.componentDidMount();
  };

  scrollToBottom = () => {
    //if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent)))
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  scrollToBottomInstant = () => {
    // if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent)))
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  };

  handleRequestClose = () => {
    this.setState({
      newMessage: false
    });
  };

  handleActionClick = () => {
    this.setState({
      open: false
    });
    this.scrollToBottom();
  };

  render() {
    const { chats } = this.state;
    // console.log(chats);
    return (
      <Row style={{ width: "101.3%" }} className="chat-overflow">
        <ul className="chats" ref="chats">
          {this.state.chats}
          <li
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </ul>
        <Snackbar
          open={this.state.newMessage}
          message="New message(s)!"
          action="Click to view"
          autoHideDuration={5000}
          onActionClick={this.handleActionClick}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default MessageList;

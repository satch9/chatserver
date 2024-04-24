import { Card } from "antd"
import { useContext, useEffect, useState } from "react";
import { SocketContext } from '../../context/socketContext.js';
import RoomList from './RoomList';
import CreateRoom from './CreateRoom';
import ScoreBoard from './ScoreBoard';
import { useChat } from "../../hooks/useChat.js";


const tabListNoTitle = [
  {
    key: "jeuxDispo",
    label: "Jeux disponibles",
  },
  {
    key: "creerJeux",
    label: "Créer",
  },
  {
    key: "tableauScore",
    label: "Tableau des scores",
  },
]

const Parameters = () => {
  const [activeTabKey, setActiveTabKey] = useState("jeuxDispo")
  const [roomList, setRoomList] = useState([])
  const { addMessage } = useChat()

  const players = [
    {
      name: "Joueur 1",
      score: 10,
    },
    {
      name: "Joueur 2",
      score: 5,
    },
  ]

  const socket = useContext(SocketContext)

  useEffect(() => {
    //console.log("socket [Parameters]", socket)
    const handleGetAllRooms = (data) => {
      //console.log("[Parameters] get all rooms : ", data);
      setRoomList(data);
    };
    socket.on("get all rooms", handleGetAllRooms);

    const handleNewMessage = (data) => {
      console.log(`${data.username} a écrit ${data.message}`)
      addMessage(data)
    }

    socket.on("new message", handleNewMessage)

    const handleUserJoined = (data) => {
      const message = `Bienvenu à ${data.username} sur le serveur du jeu`
      //console.log("data [handleUserJoined]",data)
      socket.emit("new message", { username: "I-ROBOT", message })
      //console.log("numUsers", data.numUsers)

    }
    socket.on("user joined", handleUserJoined)

    return () => {
      socket.off("get all rooms", handleGetAllRooms);
      socket.off("user joined", handleUserJoined);
      socket.off("new message", handleNewMessage)
    };
  }, [addMessage, socket])

  const onTab2Change = (key) => {
    setActiveTabKey(key);
  };

  const contentListNoTitle = {
    jeuxDispo: <RoomList rooms={roomList} />,
    creerJeux: <CreateRoom />,
    tableauScore: <ScoreBoard players={players} />,
  };


  return (
    <>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey]}
      </Card></>
  )
}

export default Parameters

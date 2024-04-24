import  { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Avatar, Button, List, Spin } from "antd"
import { UserOutlined } from "@ant-design/icons"
//import { useUser } from "@clerk/clerk-react"

import PropTypes from "prop-types"

const RoomList = ({rooms}) => {
  const [loadingState, setLoadingState] = useState({})
  const navigate = useNavigate()

  //const { user } = useUser()

  const handleJoinRoom = (room) =>{
    setLoadingState((prevState) => ({
      ...prevState,
      [room.room_id]: true, // Définir l'état de chargement pour cet élément de la liste
    }))

    setTimeout(() => {
      setLoadingState((prevState) => ({
        ...prevState,
        [room.room_id]: false, // Définir l'état de chargement pour cet élément de la liste
      }));

      navigate(`/gameboard/${room.room_id}`);
    }, 2000)
  }

  const renderItem = (room) => {
    //console.log("room roomlist", room);
    const isLoading = loadingState[room.room_id] || false
    return (
      <List.Item
        actions={[
          <Button
            key="join"
            type="dashed"
            onClick={() => handleJoinRoom(room)}
            disabled={isLoading}
          >
            Rejoindre {isLoading && <Spin size="small" />}
          </Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={`${room.room_name}`}
          description={`Créateur: ${room.room_creator_name}`}
        ></List.Item.Meta>
      </List.Item>
    );
  };

  return (
    <List itemLayout="horizontal" dataSource={rooms} renderItem={renderItem} />
  )
  
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      room_id: PropTypes.number,
      room_name: PropTypes.string,
      room_number_of_cards: PropTypes.number,
      room_creator: PropTypes.number,
      room_creator_name: PropTypes.string,
    }),
  ).isRequired,
};

export default RoomList

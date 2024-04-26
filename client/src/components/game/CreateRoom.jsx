import { Form, Input, Select, Button, message } from "antd"
import { useCallback, useEffect, useContext } from 'react'
import { useUser } from '@clerk/clerk-react'
import { SocketContext } from '../../context/socketContext.js'
import { useDispatch } from 'react-redux'
import { actions as gameActions } from "../../redux/reducers/gameReducer.js"
//import { useChat } from "../../hooks/useChat.js";


const CreateRoom = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { user } = useUser()
    const dispatch = useDispatch()
    const socket = useContext(SocketContext)
    //const { messages, setMessages } = useChat()

    const info = useCallback((text) => {
        messageApi.info(text);
    }, [messageApi])

    useEffect(() => {
        if (socket) {
            console.log("socket", socket)

            const handleCreatedGame = (data) => {
                console.log("data created game", data)
                info(`"${data.roomName}" créée par ${data.roomCreatorName} avec un jeu de ${data.roomNumOfCards} cartes`)
                dispatch(gameActions.setGameId(data.gameId))
                dispatch(gameActions.setRoomId(data.roomId))
                dispatch(gameActions.setRoomName(data.roomName))
                dispatch(gameActions.setCreator(data.roomCreator))
                dispatch(gameActions.setCreatorName(data.roomCreatorName))
            }

            socket.on("created game", handleCreatedGame)

            return () => {
                socket.off("created game")
            }
        }
    }, [socket, info, dispatch])

    const onCreateRoom = (values) => {
        console.log("values [createRoom]", values);
        socket.emit("create room", { roomName: values.roomName, roomCreator: user.username, roomNumCards: parseInt(values.roomNumCards) })
    }

    const onFinish = () => {
        form.validateFields().then(values => {
            onCreateRoom(values);
            form.resetFields();
        }).catch(info => {
            console.log('Validate Failed:', info);
        })
    }

    return (
        <Form
            layout="vertical"
            name="create_room"
            onFinish={onFinish}
            form={form}
        >
            {contextHolder}
            <Form.Item
                name="roomName"
                rules={[{ required: true, message: 'Veuillez saisir le nom de la salle!' }]}
            >
                <Input placeholder="Nom de la salle" />
            </Form.Item>
            <Form.Item
                name="roomNumCards"
                rules={[
                    { required: true, message: "Veuillez saisir le nombre de carte dans votre paquet!" },
                ]}
            >
                <Select placeholder="Choisir combien de cartes dans le paquet">
                    <Select.Option value="32">32</Select.Option>
                    <Select.Option value="52">52</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">Créer</Button>
        </Form>
    )
}

export default CreateRoom

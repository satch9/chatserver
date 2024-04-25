import { sequelize } from '../database/db.js'
import Player from './Player.js'

class Room {
  constructor() {
    this.room_id = null
    this.room_name = null
    this.room_creator = null
    this.room_creator_name = null
    this.room_number_of_cards = null
  }

  async createRoomToDB(name, numCards, creator) {
    console.log("createRoomToDB")
    let room
    try {
      let roomFound = await Room.getRoomByName(name)
      console.log("roomFound [createRoomToDB]",roomFound)
      if (roomFound.length === 0) {
        room = await sequelize.models.Room.create({
          room_name: name,
          room_creator: creator,
          room_number_of_cards: numCards,
        })
      } else {
        room = roomFound[0]
      }

      this.room_id = room.room_id
      this.room_name = room.room_name
      this.room_number_of_cards = room.room_number_of_cards

      // Récupérer les détails du joueur créateur
      const creatorDetails = await Player.getPlayerById(creator)
      if (creatorDetails) {
        room.room_creator_name = creatorDetails.player_name
        await room.save()
      } else {
        console.log(
          'Impossible de trouver les détails du créateur de la salle.',
        )
      }

      this.room_creator_name = room.room_creator_name
      this.room_creator = creatorDetails.player_id

      return room
    } catch (error) {
      console.error(
        `Erreur lors de l'enregistrement de la salle ${this.room_name} dans la base de données :`,
        error,
      )
      throw error
    }
  }

  static async getRoomByName(name) {
    try {
      const results = await sequelize.models.Room.findAll({
        where: {
          room_name: name,
        },
      })
      return results
    } catch (error) {
      console.error(
        `Erreur lors de la recherche de la salle par nom ${name} :`,
        error,
      )
      throw error
    }
  }

  static async getRoomById(roomId) {
    try {
      const room = await sequelize.models.Room.findByPk(roomId)
      return room
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la salle avec l'id: ${roomId} :`,
        error,
      )
      throw error
    }
  }

  static async getRooms(callback) {
    try {
      const rows = sequelize.models.Room.findAll()
      rows
        .then((data) => callback(null, data))
        .catch((err) => callback(err, []))
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de toutes les salles :`,
        error,
      )
      callback(error)
    }
  }
}

export default Room

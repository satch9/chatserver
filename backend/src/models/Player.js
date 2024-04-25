import { sequelize } from '../database/db.js'

class Player {
  constructor() {
    this.player_id = null
    this.player_name = null
    this.player_socket_id = null
  }

  async createPlayerToDB(playerSocketId, playerName) {
    let player
    try {
      let playerFound = await Player.getPlayerByName(playerName)
      if (playerFound.length == 0) {
        player = await sequelize.models.Player.create({
          player_name: playerName,
          player_socket_id: playerSocketId,
        })
      } else {
        console.warn('Joueur existant dans la base. On crée sa salle.')
        console.log('playerNameExist', player)
        player = playerFound[0]
      }
      this.player_id = player.player_id
      this.player_name = player.player_name
      this.player_socket_id = player.player_socket_id

      return player
    } catch (error) {
      console.error(
        `Erreur lors de l'enregistrement du joueur ${this.player_name} dans la base de données :`,
        error,
      )
      throw error
    }
  }

  static async getPlayerByName(name) {
    try {
      const [results, metadata] = await sequelize.query(
        'SELECT * FROM Players WHERE player_name=? ',
        {
          replacements: [name],
        },
      )
      //console.log("results", results)
      //console.log("metadata", metadata)
      return results
    } catch (error) {
      console.error(
        `Erreur lors de la recherche du joueur par nom ${name} :`,
        error,
      )
      throw error
    }
  }

  static async getPlayerById(id) {
    try {
      const player = await sequelize.models.Player.findByPk(id)
      return player
    } catch (error) {
      console.error(
        `Erreur lors de la recherche du joueur par ID ${id} :`,
        error,
      )
      throw error
    }
  }

  static async getPlayerBySocketId(socketId) {
    try {
      const results = await sequelize.models.Player.findAll({
        where: {
          player_socket_id: socketId,
        },
      })
      return results
    } catch (error) {
      console.error(
        `Erreur lors de la recherche du joueur par socketId ${socketId} :`,
        error,
      )
      throw error
    }
  }

  async getPlayerRooms() {}
  async getPlayerRoomsBySocketId() {}

  async updatePlayer(playerName, creator) {}
  async deletePlayer() {}
}

export default Player

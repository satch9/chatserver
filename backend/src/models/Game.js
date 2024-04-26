import Player from './Player.js'
import Room from './Room.js'
import { sequelize } from '../database/db.js'

class Game {
  constructor() {
    this.game_id = null
    this.game_room_id = null
    this.game_current_player = null
    this.game_start_date = null
    this.game_end_date = null
    this.game_winner_id = null
    this.game_updated_date = null
  }

  async buildGame(socket, values) {
    let player = new Player()
    await player.createPlayerToDB(socket.id, values.roomCreator)

    let room = new Room()
    await room.createRoomToDB(
      values.roomName,
      values.roomNumCards,
      player.player_id,
    )

    console.log('room [buildGame]', room)
    await this.createGameToDB(room.room_id)
    console.log(`Game created by ${values.roomCreator} `)

    return {
      gameId: this.game_id,
      gameRoomId: this.game_room_id,
      gameCurrentPlayer: this.game_current_player,
      gameStartDate: this.game_start_date,
      gameEndDate: this.game_end_date,
      gameWinnerId: this.game_winner_id,
      gameUpdatedDate: this.game_updated_date,
      roomId: room.room_id,
      roomName: room.room_name,
      roomCreator: room.room_creator,
      roomCreatorName: room.room_creator_name,
      roomNumOfcards: room.room_number_of_cards,
    }
  }

  async createGameToDB(gameRoomID) {
    
    try {
      let newGame = await sequelize.models.Game.create({
        game_room_id: gameRoomID,
      })
      console.log('newGame', newGame)
      this.game_id = newGame.game_id
      this.game_room_id = newGame.game_room_id
    } catch (error) {
      console.error(
        `Erreur lors de l'enregistrement de la partie ${this.game_id} dans la base de données :`,
        error,
      )
      throw error
    }
  }

  async setStartDate() {
    const dateNow = new Date()
    this.game_start_date = dateNow
    this.game_updated_date = dateNow
    await sequelize.models.Game.update(
      {
        game_start_date: this.game_start_date,
        game_updated_date: this.game_updated_date,
      },
      { where: { game_id: this.game_id } },
    )
  }

  
}

export default Game

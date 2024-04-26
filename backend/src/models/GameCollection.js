class GameCollection {
  constructor() {
    this.totalGameCount = 0
    this.gameList = []
  }

  addGame(game) {
    this.gameList.push(game)
    this.totalGameCount++
  }
  getGameList() {
    return this.gameList
  }
  getGameCount() {
    return this.totalGameCount
  }
  
}

export default GameCollection

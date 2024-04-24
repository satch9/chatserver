import { Sequelize, DataTypes } from 'sequelize'

// Créez une instance Sequelize avec les informations de connexion à votre base de données SQLite
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '.tmp/bataille.sqlite',
  logging: false,
})

// Créez un modèle pour la table "Player"
export const Player = sequelize.define(
  'Player',
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    player_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    player_socket_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'player_createdAt',
    updatedAt: 'player_updatedAt',
  },
)

// Créez un modèle pour la table "Game"
export const Game = sequelize.define(
  'Game',
  {
    game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game_room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    game_current_player: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    game_start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    game_end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    game_winner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    game_updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
)

// Créez un modèle pour la table "Room"
export const Room = sequelize.define(
  'Room',
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    room_creator: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    room_creator_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    room_number_of_cards: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'room_createdAt',
    updatedAt: 'room_updatedAt',
  },
)

// Créez un modèle pour la table "GamePlayer"
export const GamePlayer = sequelize.define(
  'GamePlayer',
  {
    gamePlayer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    gamePlayer_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    gamePlayer_hand: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'gamePlayer_createdAt',
    updatedAt: 'gamePlayer_updatedAt',
  },
)

// Relation entre "Game" et "Player"
Game.belongsToMany(Player, {
  through: 'GamePlayer',
})
Player.belongsToMany(Game, {
  through: 'GamePlayer',
})

// Créez un modèle pour la table "Conversation"
export const Conversation = sequelize.define(
  'Conversation',
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    conversation_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    conversation_player_id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Player',
        key: 'player_id',
      },
    },
  },
  {
    timestamps: true,
    createdAt: 'conversation_createdAt',
    updatedAt: 'conversation_updatedAt',
  },
)

// Créez un modèle pour la table "Message"
export const Message = sequelize.define(
  'Message',
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Player',
        key: 'player_id',
      },
    },
    message_content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'message_createdAt',
    updatedAt: 'message_updatedAt',
  },
)

Player.belongsToMany(Conversation, {
  through: 'PlayerConversation',
})
Conversation.belongsToMany(Player, {
  through: 'PlayerConversation',
})

Message.belongsTo(Conversation)


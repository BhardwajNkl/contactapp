const { contacts } = require('../dummydata');
const sequelize = require('./dbConfig');
const {DataTypes} = require('sequelize');

const Contact = sequelize.define(
    'contacts',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Contact;
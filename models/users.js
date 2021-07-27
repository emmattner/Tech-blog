const bcrypt = require("bcryptjs");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates User model
class User extends Model {
    validPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}



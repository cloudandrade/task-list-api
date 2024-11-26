import { DataTypes, Model, Optional } from 'sequelize';
import db from '#config/dbConfig';

const sequelize = db.getInstance();

interface TaskAttributes {
  id: number;
  title: string;
  subtitle: string;
  userId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public subtitle!: string;
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'task',
    timestamps: false,
  }
);

export default Task;

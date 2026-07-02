import { DataTypes, Model, Sequelize } from 'sequelize'

export interface IPost {
  id?: number
  title: string
  slug: string
  content: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  publishedAt?: Date
  hash?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Post extends Model<IPost> {
  declare id: number
  declare title: string
  declare slug: string
  declare content: string
  declare description: string
  declare keywords: string
  declare ogImage: string
  declare canonicalUrl: string
  declare publishedAt: Date
  declare hash: string
}

export function initPostModel(sequelize: Sequelize): void {
  Post.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(500), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    content: { type: DataTypes.TEXT('long'), allowNull: false },
    description: { type: DataTypes.TEXT },
    keywords: { type: DataTypes.TEXT, defaultValue: '' },
    ogImage: { type: DataTypes.STRING(500) },
    canonicalUrl: { type: DataTypes.STRING(500) },
    publishedAt: { type: DataTypes.DATE },
    hash: { type: DataTypes.STRING(64) },
  }, {
    sequelize,
    modelName: 'post',
    tableName: 'posts',
    timestamps: true,
    indexes: [{ unique: true, fields: ['slug'] }, { fields: ['hash'] }],
  })
}

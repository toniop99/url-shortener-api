import { connect } from 'mongoose'
import { env } from '../index'

export const databaseConnection = async (): Promise<void> => {
  try {
    const { DB_NAME, DB_PASSWORD, DB_USERNAME } = env
    const urlConnection = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.3cdtb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    await connect(urlConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log('Database is connected')
  } catch (e) {
    console.log('Error on the connection to the database: ', e)
  }
}

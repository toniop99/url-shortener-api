import { Request, Response } from 'express'
import { UrlModel } from '../database/models/UrlShortener'
import { toReceivedUrlShortener } from '../utils/cheks/UrlShortener/typechecks'

export async function createShortenUrl (req: Request, res: Response): Promise<void> {
  try {
    const newUrlEntry = toReceivedUrlShortener(req.body)

    const newUrlModel = new UrlModel({
      original: newUrlEntry.original,
      shorten: newUrlEntry.shorten,
      clicks: newUrlEntry.clicks,
      active: newUrlEntry.active
    })

    await newUrlModel.save()

    res.status(201).json(newUrlEntry)
  } catch (e) {
    // TODO: Change the way of getting this error
    if (e.code === 11000) {
      res.status(400).json({ message: 'Shorten url already exists' })
    } else {
      res.status(400).json({ message: e.message })
    }
  }
}

export async function deleteShortenUrl (req: Request, res: Response): Promise<void> {
  const shorten = req.body.path
  const deleted = await UrlModel.deleteOne({ shorten })

  try {
    if (deleted.deletedCount !== undefined && deleted.deletedCount === 0) {
      res.status(404).json({
        message: 'url not found'
      }).end()
    } else if (deleted.ok !== undefined) {
      res.status(200).json({
        message: 'url deleted satisfactorily'
      }).end()
    }
  } catch (e) {
    res.status(500).json({
      message: e.message
    }).end()
  }
}

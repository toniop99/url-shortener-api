import { Request, Response } from 'express'
import { UrlModel } from 'src/database/models/UrlShortener'
import { toReceivedUrlShortener } from 'src/utils/cheks/UrlShortener/typechecks'

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

    res.status(201).json({
      'object created': newUrlModel.toJSON()
    })
  } catch (e) {
    res.status(400).json(e.message)
  }
}

export async function deleteShortenUrl (req: Request, res: Response): Promise<void> {
  const shorten = req.body.path
  const deleted = await UrlModel.deleteOne({ shorten })

  if (deleted.deletedCount !== undefined && deleted.deletedCount === 0) {
    res.status(200).json({
      'object not found': true
    }).end()
  } else if (deleted.ok !== undefined) {
    res.status(200).json({
      'object deleted': true
    }).end()
  } else {
    res.status(404).json({
      Error: true
    }).end()
  }
}

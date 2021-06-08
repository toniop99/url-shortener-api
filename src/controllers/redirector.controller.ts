import { Request, Response } from 'express'
import { UrlModel } from 'src/database/models/UrlShortener'
import { env } from 'src/index'

export async function redirectToPath (req: Request, res: Response): Promise<void> {
  const path = req.params.path
  const url = await UrlModel.findOne({ shorten: env.BASE_URL.concat(path) })
  if (url != null) {
    if (!url.active) {
      res.status(401).redirect('/')
    } else {
      url.clicks++
      await url.save()
      res.status(301).redirect(url.original)
    }
  } else {
    res.status(404).redirect('/')
  }
}

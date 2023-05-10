import { prisma } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { method } = req
  
  switch (method) {
    case 'POST':
      // Update or create data in your database
      const { name, start } = req.body
      console.log(name, start)
      const race = await prisma.post.create({
        race: {
          name,
          start,
        },
      })
      res.status(201).json(race)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
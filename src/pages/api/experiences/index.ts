import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { experienceValidationSchema } from 'validationSchema/experiences';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getExperiences();
    case 'POST':
      return createExperience();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getExperiences() {
    const data = await prisma.experience
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'experience'));
    return res.status(200).json(data);
  }

  async function createExperience() {
    await experienceValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.experience.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

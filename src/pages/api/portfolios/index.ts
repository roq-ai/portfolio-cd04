import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { portfolioValidationSchema } from 'validationSchema/portfolios';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPortfolios();
    case 'POST':
      return createPortfolio();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPortfolios() {
    const data = await prisma.portfolio
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'portfolio'));
    return res.status(200).json(data);
  }

  async function createPortfolio() {
    await portfolioValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.experience?.length > 0) {
      const create_experience = body.experience;
      body.experience = {
        create: create_experience,
      };
    } else {
      delete body.experience;
    }
    if (body?.project?.length > 0) {
      const create_project = body.project;
      body.project = {
        create: create_project,
      };
    } else {
      delete body.project;
    }
    if (body?.skill?.length > 0) {
      const create_skill = body.skill;
      body.skill = {
        create: create_skill,
      };
    } else {
      delete body.skill;
    }
    if (body?.testimonial?.length > 0) {
      const create_testimonial = body.testimonial;
      body.testimonial = {
        create: create_testimonial,
      };
    } else {
      delete body.testimonial;
    }
    const data = await prisma.portfolio.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

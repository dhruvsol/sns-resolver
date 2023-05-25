/* eslint-disable @typescript-eslint/no-unsafe-return */
import { User } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { prisma } from '~/server/db';

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        domain: z.string(),
        publickey: z.string(),
        signature: z.string(),
        redirect: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const res = (await prisma.user.create({
        data: {
          domain: input.domain,
          publickey: input.publickey,
          signature: input.signature,
          redirect: input.redirect,
        },
      })) as User;

      return res ?? null;
    }),

  get: publicProcedure
    .input(
      z.object({
        domain: z.string(),
      })
    )
    .query(async ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const res = await prisma.user.findUnique({
        where: {
          domain: input.domain,
        },
      });

      return res;
    }),
});

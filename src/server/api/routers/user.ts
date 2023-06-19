/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { prisma } from '~/server/db';

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        domain: z.string(),
        publickey: z.string(),
        redirect: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const res = await prisma.user.create({
        data: {
          domain: input.domain,
          publickey: input.publickey,
          redirect: input.redirect,
        },
      });

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

  getAll: publicProcedure
    .input(
      z.object({
        wallet: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.wallet === '') return null;
      const res = await prisma.user.findMany({
        where: {
          publickey: input.wallet,
        },
      });

      return res;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        redirect: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          redirect: input.redirect,
        },
      });
      return res;
    }),
});

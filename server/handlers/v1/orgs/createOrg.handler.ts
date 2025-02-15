import { Request, Response } from "express";
import { z } from "zod";
import { OrgRepo } from "../../../repo/org.repo";
import $prisma from "../../../lib/prisma";
import { UserOrgRole } from "@prisma/client";

const registerInput = z.object({
  name: z.string(),
});

export async function createOrgHandler(req: Request, res: Response) {
  try {
    const data = registerInput.parse(req.body);

    const org = await $prisma.$transaction(async (txn: any) => {
      const org = await OrgRepo.createOrg(txn, data.name);

      await OrgRepo.upsertOrgMember(
        txn,
        org.id,
        //  @ts-ignore
        req.user.id,
        UserOrgRole.OWNER,
      );

      return org;
    });

    res.status(200).json({
      data: org,
    });
  } catch (err: any) {
    console.log(`>>>err`, err);
    res.status(500).json(err);
  }
}

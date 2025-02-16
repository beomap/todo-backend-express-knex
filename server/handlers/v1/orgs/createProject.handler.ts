import { Request, Response } from "express";
import { z } from "zod";
import { OrgRepo } from "../../../repo/org.repo";
import $prisma from "../../../lib/prisma";
import { UserOrgRole } from "@prisma/client";
import { ProjectRepo } from "../../../repo/project.repo";

const input = z.object({
  name: z.string(),
  description: z.string(),
});

export async function createProjectHandler(req: Request, res: Response) {
  try {
    const data = input.parse(req.body);

    const org = await ProjectRepo.create($prisma, {
      ...data,
      orgId: req.params.id,
    });

    res.status(200).json({
      data: org,
    });
  } catch (err: any) {
    res.status(500).json(err);
  }
}

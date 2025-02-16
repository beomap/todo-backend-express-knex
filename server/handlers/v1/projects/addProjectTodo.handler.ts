import { Request, Response } from "express";
import { z } from "zod";
import { OrgRepo } from "../../../repo/org.repo";
import $prisma from "../../../lib/prisma";
import { UserOrgRole } from "@prisma/client";
import { TodoRepo } from "../../../repo/todos.repo";
import { ProjectRepo } from "../../../repo/project.repo";

const input = z.object({
  title: z.string(),
  description: z.string(),
});

export async function addProjectTodoHandler(req: Request, res: Response) {
  try {
    const project = await ProjectRepo.getById($prisma, req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    const orgMem = await OrgRepo.getOrgMember(
      $prisma,
      project.orgId,
      // @ts-ignore
      req.user.id,
    );

    if (!orgMem) {
      res.status(404).json({
        message: "Org not found",
      });
      return;
    }

    if (
      orgMem.role !== UserOrgRole.OWNER &&
      orgMem.role !== UserOrgRole.ADMIN
    ) {
      res.status(403).json({
        message: "Permission denied",
      });
      return;
    }

    const data = input.parse(req.body);

    const mem = await TodoRepo.create($prisma, {
      project_id: req.params.id,
      title: data.title,
      description: data.description,
    });
    res.status(200).json({
      data: mem,
    });
  } catch (err: any) {
    res.status(500).json(err);
  }
}

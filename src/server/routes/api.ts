import { Router } from "express";
import { prisma } from "../db/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const apiRouter = Router();

apiRouter.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json({ users });
});

apiRouter.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: { id: true, email: true, name: true, role: true, department: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
  password: z.string().min(12),
  role: z.enum(["member", "admin", "viewer"]).default("member"),
  department: z.string().optional(),
});

apiRouter.post("/users", async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

  const hash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: { ...parsed.data, password: hash },
    select: { id: true, email: true, name: true, role: true },
  });
  res.status(201).json(user);
});

apiRouter.get("/issues", async (req, res) => {
  const status = req.query.status as string | undefined;
  const issues = await prisma.issue.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json({ issues });
});

apiRouter.get("/issues/:id", async (req, res) => {
  const issue = await prisma.issue.findUnique({ where: { id: req.params.id } });
  if (!issue) return res.status(404).json({ error: "Issue not found" });
  res.json(issue);
});

apiRouter.get("/deployments", async (_req, res) => {
  const deployments = await prisma.deployment.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  res.json({ deployments });
});

apiRouter.post("/deployments", async (req, res) => {
  const deployment = await prisma.deployment.create({
    data: {
      environment: req.body.environment || "staging",
      branch: req.body.branch || "main",
      commitSha: req.body.commitSha,
      triggeredBy: req.body.triggeredBy,
      status: "pending",
    },
  });
  res.status(201).json(deployment);
});

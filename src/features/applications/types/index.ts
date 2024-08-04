import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(3),
  profileImageUrl: z.string(),
  bannerImageUrl: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const ApplicationSchema = z.object({
  name: z.string().min(3),
  contributionDescription: z.string().min(3),
});

export type Application = z.infer<typeof ApplicationSchema>;

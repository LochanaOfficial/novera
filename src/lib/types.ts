import { Notification, Role } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";

export type NotificationWithUser =
  | ({
      User: {
        id: string
        name: string
        avatarUrl: string
        email: string
        createdAt: Date
        updatedAt: Date
        role: Role
        agencyId: string | null
      }
    } & Notification)[]
  | undefined

export type UserWithPermitionsAndSubAccounts = Prisma.PromiseReturnType<
    typeof getUserPermissions
>

export type AuthUserWithAgencySidebarOptionSubAccounts = Prisma.PromiseReturnType<
    typeof getAuthUserDetails
>
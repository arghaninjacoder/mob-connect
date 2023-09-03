import { Member, Profile, Server } from "@prisma/client";

export type ServerWitMembersWithProfiles = Server & {
  members: (Member & {
    profile: Profile
  })[]
}
import { currentUser, redirectToSignIn } from "@clerk/nextjs"

import { db } from "@/lib/db"

export const initialProfile = async () => {
  const user = await currentUser()

  if (!user) return redirectToSignIn()

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  // means with clerk userId a profile is already created.
  if (profile) {
    return profile
  }

  // new clerk login
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newProfile
}
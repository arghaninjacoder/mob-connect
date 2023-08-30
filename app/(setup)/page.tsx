import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initialProfile'
import { InitialModal } from '@/components/modals/initial-modal'

const SetupPage = async () => {
  const profile = await initialProfile()

  // search through all the servers and all the members within that server, find the first server where this profile is present.
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}

export default SetupPage

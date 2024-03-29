import { ConnectModal } from '@/app/(dashboard)/u/[username]/keys/_components/connect-modal'
import { KeyCard } from '@/app/(dashboard)/u/[username]/keys/_components/key-card'
import { UrlCard } from '@/app/(dashboard)/u/[username]/keys/_components/url-card'
import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'

const KeysPage = async () => {
  const self = await getSelf()
  const stream = await getStreamByUserId(self.id)

  if (!stream) {
    throw new Error('Stream not found')
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl || ''} />
        <KeyCard value={stream.streamKey || ''} />
      </div>
    </div>
  )
}

export default KeysPage

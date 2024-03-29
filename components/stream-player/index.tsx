'use client'

import { AboutCard } from '@/components/stream-player/about-card'
import { Chat, ChatSkeleton } from '@/components/stream-player/chat'
import { Toggle } from '@/components/stream-player/chat/toggle'
import { Header, HeaderSkeleton } from '@/components/stream-player/header'
import { InfoCard } from '@/components/stream-player/info-card'
import { Video, VideoSkeleton } from '@/components/stream-player/video'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { LiveKitRoom } from '@livekit/components-react'
import { Stream, User } from '@prisma/client'

type CustomStream = {
  id: Stream['id']
  name: Stream['name']
  thumbnailUrl: Stream['thumbnailUrl']
  isChatDelayed: Stream['isChatDelayed']
  isChatEnabled: Stream['isChatEnabled']
  isChatFollowersOnly: Stream['isChatFollowersOnly']
}

interface StreamPlayerProps {
  isFollowing: boolean
  stream: CustomStream
  user: {
    id: User['id']
    username: User['username']
    bio: User['bio']
    imageUrl: User['imageUrl']
    stream: CustomStream | null
    _count: {
      followedBy: number
    }
  }
}

export const StreamPlayer = ({
  isFollowing,
  stream,
  user,
}: StreamPlayerProps) => {
  const { identity, name, token } = useViewerToken(user.id)

  const { collapsed } = useChatSidebar((state) => state)

  if (!identity || !name || !token) {
    return <StreamPlayerSkeleton />
  }

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[72px] z-50 hidden xl:block">
          <Toggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid h-full grid-cols-1 xl:grid-cols-4 xl:gap-y-0 2xl:grid-cols-5',
          collapsed && 'xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-8 xl:col-span-3 xl:overflow-y-auto 2xl:col-span-4">
          <Video hostIdentity={user.id} hostName={user.username} />
          <Header
            hostIdentity={user.id}
            hostName={user.username}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostIdentity={user.id}
            hostName={user.username}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            hostIdentity={user.id}
            hostName={user.username}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            viewerName={name}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid h-full grid-cols-1 xl:grid-cols-4 xl:gap-y-0 2xl:grid-cols-5">
      <div className="hidden-scrollbar col-span-1 space-y-4 xl:col-span-3 xl:overflow-y-auto 2xl:col-span-4">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  )
}

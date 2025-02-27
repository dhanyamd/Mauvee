import { GlassModal } from '@/app/globals/glass-modal'
import { Button } from '@/components/ui/button'
import { useActiveGroupSubscription, useJoinFree } from '@/hooks/payment'
import React from 'react'
type JoinButtonProps = {
    owner: boolean
    groupid : string
}

const JoinButton = ({groupid, owner} : JoinButtonProps) => {
    //WIP : adding subscriptions
    const { data } = useActiveGroupSubscription(groupid)
    const { onJoinFreeGroup } = useJoinFree(groupid)
     if(!owner) {
        if(data?.status !== 200) {
            return (
                <GlassModal
                trigger={
                    <Button className='w-full p-10' variant={"ghost"}>
                    <p>Join now</p>
                    </Button>
                }
                title='Join this group'
                description='Pay now to join the community!'
                >
                
      <Button onClick={onJoinFreeGroup} className="w-full p-10" variant="ghost">
        Join now
      </Button>
                </GlassModal>
            )
        }
     }
     return (
        <Button disabled={owner} className="w-full p-10" variant="ghost">
          Owner
        </Button>
      )
}

export default JoinButton

import { GlassModal } from '@/app/globals/glass-modal'
import { Button } from '@/components/ui/button'
import { useActiveGroupSubscription, useJoinFree } from '@/hooks/payment'
import { CardElement } from '@stripe/react-stripe-js'
import React from 'react'
type JoinButtonProps = {
    owner: boolean
    groupid : string
}

const JoinButton = ({groupid, owner} : JoinButtonProps) => {
    //WIP : adding subscriptions
    const { data } = useActiveGroupSubscription(groupid)
    const { onJoinFreeGroup } = useJoinFree(groupid)
     if(owner) {
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
                       <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#B4B0AE",
              "::placeholder": {
                color: "#B4B0AE",
              },
            },
          },
        }}
        className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
      />
                
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

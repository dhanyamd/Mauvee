//enable this for prod, making it disabled for development currently

import { client } from "@/lib/prisma"

export const onGetActiveSubscription = async(groupid : string) => {
    try {
        const subscription = await client.subscription.findFirst({
            where : {
                groupId : groupid,
                //WIP: make this true later on
                active : false
            }
        })
        if(subscription){
            return { status : 200, subscription}
        }
    } catch (error) {
        return {status : 404}
    }
}
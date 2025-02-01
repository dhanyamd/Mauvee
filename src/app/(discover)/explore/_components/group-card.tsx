import { Card } from '@/components/ui/card'
import { truncateString } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import pfp from "@/icons/images.jpg"

type Props = {
    id: string
    name: string
    category: string
    createdAt: Date
    userId: string
    thumbnail: string | null
    description: string | null
    privacy: "PUBLIC" | "PRIVATE"
    preview?: string
}

const GroupCard = ({id,category,createdAt,description,name,privacy,thumbnail,userId,preview} : Props) => {
  return (
    <Link href={`/about/${id}`} >
      <Card>
        <Image
          alt="thumbnail"
          src={pfp}
          className="w-full opacity-70 h-56"
          layout="responsive"
        />
        
        <div className="p-6">
          <h3 className="text-lg text-themeTextGray font-bold">{name}</h3>
          <p className="text-base text-themeTextGray">
            {description && truncateString(description)}
          </p>
        </div>
      </Card>
    </Link>
  )
}

export default GroupCard

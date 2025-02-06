'use client'
import { NoResult } from '@/app/globals/search/no-result'
import { useGroupInfo } from '@/hooks/groups'
import { useGroupAbout } from '@/hooks/groups/groupcreate'
import React from 'react'
import MediaGallery from './gallery'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import { HtmlParser } from '@/app/globals/html-parser'
import BlockTextEditor from '@/app/globals/rich-text-editor'

type Props = {
    userid : string,
    groupid : string
}

const AboutGroup = ({groupid, userid} : Props) => {
    const { group } = useGroupInfo()
    const {
      activeMedia, 
      editor,
      errors,
      isPending, 
      onDescription,
      onEditDescription,
      onJsonDescription,
      onSetActionMedia,
      onUpdateDescription,
      setJsonDescription,
      setOnDescription, setOnHtmlDescription
    } = useGroupAbout( group.description, group.jsonDescription, group.htmlDescription, group.gallery[0], groupid)

  if(!group)
    return (
  <div>
    <NoResult />
  </div>)

  return (
   <div className='flex flex-col gap-y-10'>
   <div>
    <h2 className='font-bold text-[56px] leading-none md:leading-normal'>
    {group.name}
    </h2>
    <p className='text-themeTextGray leading-none md:mt-2 mt-5'>
     {group.description}
    </p>
   </div>
   {group.gallery.length > 0 && (
    <div className='relative rounded-xl'>
      <div className='img--overlay absolute h-2/6 bottom-0 w-full z-50'>
        {activeMedia?.type === "IMAGE" ? (
          <img 
          src={`https://ucarecdn.com/${activeMedia.url}/`}
          alt='group-img'
          className='w-full aspect-video z-20 rounded-t-xl'
          />
        ) :
         activeMedia?.type === "LOOM" ? (
          <div className='w-full aspect-video'>
            <iframe
            src={activeMedia.url}
            allowFullScreen
            className='absolute outline-none border-0 top-0 left-0 w-full h-full rounded-t-xl'
            >

            </iframe>
            </div>
         ) : (
          activeMedia?.type === "YOUTUBE" && (
            <div className='w-full aspect-video relative'>
              <iframe 
              allowFullScreen
              src={activeMedia.url}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              className='w-full absolute top-0 left-0 h-full rounded-xl'>
              </iframe>
              </div>
          )
         )
        }
        </div>
</div>
   )}
   <MediaGallery
   gallery={group.gallery}
   groupid={groupid}
   onActive={onSetActionMedia}
   userid={userid}
   groupUserid={group.userId}
   />

{userid !== group.userId ? (
        <HtmlParser html={group.htmlDescription || "<></>"} />
      ) : (
        <form
          ref={editor}
          onSubmit={onUpdateDescription}
          className="mt-5 flex flex-col"
        >
          <BlockTextEditor
            onEdit={onEditDescription}
            max={10000}
            inline
            min={100}
            disabled={userid === group.userId ? false : true}
            name="jsondescription"
            errors={errors}
            setContent={setJsonDescription}
            content={onJsonDescription}
            htmlContent={group.htmlDescription as string | undefined}
            setHtmlContent={setOnHtmlDescription}
            textContent={onDescription}
            setTextContent={setOnDescription}
          />
          {onEditDescription && (
            <Button
              className="self-end bg-themeBlack border-themeGray px-10"
              variant={"outline"}
              disabled={isPending}
              type="submit"
            >
              <Loader loading={isPending}>Update</Loader>
            </Button>
          )}
        </form>
      )}
   </div>
  )
  
}

export default AboutGroup

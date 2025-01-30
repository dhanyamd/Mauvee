import React from 'react'

const SettingsPage = ({params} : {params : {groupid : string}}) => {
  return (
    <div className='flex flex-col w-full h-full gap-10 px-16 py-10 overflow-auto'>
        <div className='flex flex-col'>
         <h3 className='text-3xl font-bold'>Group Settings</h3>
         <p className='text-sm pt-1 text-themeTextGray'>
            Adjust your group settings here. These
             settings might take a few minutes to
             reflect on the explore page!
         </p>
        </div>
    </div>
  )
}

export default SettingsPage


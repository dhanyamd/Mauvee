import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import React from 'react'

 type glassSheetProps = {
    children : React.ReactNode
    trigger : React.ReactNode
    className? : string 
    triggerClass? : string
}

const index = ({children,  trigger,  className, triggerClass} : glassSheetProps) => {
 return (
    <Sheet>
        <SheetTrigger className={cn(triggerClass)} asChild>
           {trigger}
        </SheetTrigger>
        <SheetContent
        className={cn("bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-20 bg-themeGray border-themeGray", className)}
        >
          {children}
        </SheetContent>
    </Sheet>
 )
}

export default index

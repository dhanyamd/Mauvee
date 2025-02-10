'use client'
import { GlobalAccordion } from "@/app/globals/accordion"
import { Button } from "@/components/ui/button"
import { useCreateModule } from "@/hooks/courses"
import { BadgePlus } from "@/icons/badge-plus"
import { Plus, PlusCircle } from "lucide-react"

type CreateCourseModuleProps = {
    courseId: string
    groupid: string
}
export const CreateCourseModule = ({
 groupid,
 courseId
} : CreateCourseModuleProps) => {
 const {variables, isPending, onCreateModule, data} = useCreateModule(courseId, groupid)
  
 
 return (
    <div className="flex flex-col gap-y-2">
     <div className="flex justify-end">
     <PlusCircle onClick={onCreateModule}
      className="text-themeGray cursor-pointer hover:text-themeGray/60"/>
     </div>
     {variables && isPending && (
        <GlobalAccordion id={variables.moduleId} title={variables.title}>
         <Button
         variant={"outline"}
         className="bg-transparent border-themeGray text-themeTextGray mt-2"
         >
        <Plus /> 
         </Button>
        </GlobalAccordion>
     )}
    </div>
 )
 
}
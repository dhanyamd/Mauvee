import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

type SimpleModalProps = {
    trigger: JSX.Element
    children : React.ReactNode
    title? : string
    description? : string 
    type? : "Integration"
    logo? : string
}

export const SimpleModal = ({
 trigger,
 children,
 title,
 type,
 logo,
 description
} : SimpleModalProps) => {
    switch (type) {
        case "Integration":
            return (
             <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className="bg-themeBlack border-themeDarkGray">
                <div className="flex justify-center gap-3">
                <div className="w-12 h-12 relative">
                  <Image 
                  src={`https://ucarecdn.com/9c03e259-4d78-4f22-afec-79f0cb6831c8/gradient2.jpg`}
                  fill
                  alt="Corinna"
                  />
                </div>
                <div className="text-gray-400">
                   <ArrowLeft size={20} />
                   <ArrowRight size={20}/>
                </div>
                <div className="w-12 h-12 relative">
                   <Image 
                   src={`https://ucarecdn.com/${logo}/`}
                   fill
                   alt="stripe"
                   />
                </div>
                </div>
                <DialogHeader className="flex items-center">
             <DialogTitle className="text-xl">
              {title}
             </DialogTitle>
             <DialogDescription className="text-center">{description}</DialogDescription>
                </DialogHeader>
                {children}
                </DialogContent>
             </Dialog>
            )
    
        default:
            return (
                <Dialog>
                    <DialogTrigger asChild>{trigger}</DialogTrigger>
                    <DialogContent className="bg-[#1C1C1E] !max-w-2xl border-themeGray">
                       {children}
                    </DialogContent>
                </Dialog>
            )
    }
  
}


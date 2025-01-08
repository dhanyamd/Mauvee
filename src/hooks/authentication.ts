import { useAuth, useSignIn } from "@clerk/nextjs"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignInSchema } from "./schema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
export const useAuthSignIn = () => {
    const {isLoaded, setActive, signIn} = useSignIn()
    const {register, formState : {errors}, reset, handleSubmit} = useForm<z.infer<typeof SignInSchema>>({
        resolver : zodResolver(SignInSchema),
        mode : "onBlur"
    })

    const router = useRouter();
    const onClerkAuth = async(email : string, password : string) => {
       if(!isLoaded){
        toast("Error", {
            description : "Oops! Something went wrong"
        })
       }
       try{
        const authenticated = await signIn?.create({
            identifier : email,
            password : password
        })

        if(authenticated?.status === "complete" ){
            reset()
            await setActive({session : authenticated.createdSessionId})
            toast("Success", {
                description : "Welcome Back!"
            })
            router.push("/callback/sign-in")
        }
       }catch (error : any){
        if(error.errors[0].code === "form_password_incorrect")
            toast("Error", {description : "email/password is incorrect. Please try again. "})
       }
    }
}
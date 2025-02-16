import { z } from "zod";

export const AddCustomDomainSChema = z.object({
    domain : z.string().min(1, {message: "You must enter a domain"})
})
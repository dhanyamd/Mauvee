import { z } from "zod"

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2 
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"]

export const CreateCourseSchema = z.object({
    name : z
            .string()
            .min(3, {message : "Course title must be atleast 3 characters"}),
    description: z.string().min(100, "description must be atleast 100 words"),
    image : z 
    .any({required_error: "You must add an image"})
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
        message: "Your file size must be less than 2MB",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
        message: "Only JPG, JPEG and PNG are accepted file formats"
    }),
    privacy: z 
              .string()
              .min(1, {message: "You need to pick a privacy setting"}),
    published: z.boolean()
})

export const CourseContentSchema = z.object({
    content : z 
              .string()
            .min(100, {
                message: "description must have atleast 100 characters"
            })
              .optional()
              .or(z.literal("").transform(() => undefined)),
    htmlcontent: z.string()
                    .optional()
                    .or(z.literal("").transform(() => undefined)),
     jsoncontent : z.string()
                    .min(100, {
                        message: "description must have atleast 100 characters"
                    })
                    .optional()
                    .or(z.literal("").transform(() => undefined))
})
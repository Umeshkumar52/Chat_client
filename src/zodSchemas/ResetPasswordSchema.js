import z from 'zod'
const ResetPasswordSchema=z.object({
    NewPassword:z.string().min(6,"Password must be at least 6 characters")
    .regex(/[a-z]/,"Must contain at least one lowerCase letter")
    .regex(/[1-9]/,"Must contain at least one number"),
})
export default ResetPasswordSchema
import z from 'zod'
const SignInSchema=z.object({
     Email:z.string().email("Enter proper email format"),
      Password:z.string().min(6,"Password require at least 6 chatacters")
         .regex(/[a-z]/,"Must require one lowerCase letter")
         .regex(/[1-9]/,"Must contain at least one number")
})
export default SignInSchema
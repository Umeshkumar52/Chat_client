import z from 'zod'
import ImgSchema from './ImgSchema'
const SignUpSchema=z.object({
    avatar:ImgSchema,
    Email:z.string().email("Enter proper email format"),
    Name:z.string().min(3,"Name require be at least 3 letters ").max(20,"Name should be less than 20 characters").regex(/^[A-Za-z\s]+$/,"Name must contain only letters and spaces"),
    UserName:z.string().min(4,"UserName require at least 4 letters").max(20,"UserName require less than 20 letters").regex(/[a-z]/,"UserName must contain at least one lowerCase letter"),
    Password:z.string().min(6,"Password must be at least 6 characters")
    .regex(/[a-z]/,"Must contain at least one lowerCase letter")
    .regex(/[1-9]/,"Must contain at least one number")
})
export default SignUpSchema
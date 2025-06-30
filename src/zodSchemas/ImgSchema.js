import z from 'zod'
const ImgSchema=z.object({
    originalname:z.string(),
    mimetype:z.enum["image/jpeg","image/png","image/jpg"]
}).optional()
export default ImgSchema

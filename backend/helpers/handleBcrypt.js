import bcrypt from "bcrypt"

export const encrypt = async (data) =>{
    const hash = await bcrypt.hash(data, 8)
    return hash
}

export const compare = async (data, hashData) =>{

    return await bcrypt.compare(data, hashData)
}
import { useDispatch, useSelector } from "react-redux"
import { selectUser, setUser } from "../features/user/userSlice"
import { selectToken } from "../features/token/tokenSlice"



async function fetchProfileData(id, isBrand = false) {
    const  user  = await selectUser()
    const userUrl = `https://altclan-api.onrender.com/api/users/${id}`
    const brandUrl = `https://altclan-brands-api-1-1.onrender.com/api/users/${id}`


    const res = await fetch(isBrand ? brandUrl : userUrl)
    const data = await res.json()

    if (data.err) {
        Promise.reject(data.err).catch(() => { })
        const error = data.err
        throw error
    }

    return data

}

export default fetchProfileData
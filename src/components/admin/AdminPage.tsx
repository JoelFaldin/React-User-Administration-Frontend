import GeneralTable from '../tables/adminTable/GeneralTable'
import dataService from '../../services/handleRequests'
import { useEffect, useState } from 'react'

const AdminPage = () => {
    // States to handle the component's behaviour:
    const [userName, setUserName] = useState('')
    const token = localStorage.getItem('jwt')

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await dataService.getUserData(token)
                setUserName(user.nombres)
            } catch(error: any) {
                console.log(error.response.data.error)
            }
        }

        if (!userName) {
            getData()
        }
    }, [])

    // Checking if there's an user already logged in:
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUserName(user.nombres)
        }
    }, [])

    return (
        <div className='bg-gradient-to-b from-white to-slate-200 min-h-dvh w-fit min-w-full pt-20'>
            <GeneralTable rol={'admin'} />
        </div>
    )
}

export default AdminPage
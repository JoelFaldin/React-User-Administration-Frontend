import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import handleRequest from '../../services/handleRequests'
import rutFormater from '../../services/rutFormater'

const Login = () => {
    const [rut, setRut] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleRut = (event: ChangeEvent<HTMLInputElement>) => {        
        if (rutFormater(event.target.value)) {
            setRut(event.target.value)
        } else {
            return
        }
    }
    
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleAuth = async (rut: string, password: string) => {
        try {
            const res = await handleRequest.verify(rut, password)
            localStorage.setItem('jwt', res.token)

            if (res.access === 'admin') {
                navigate('/data/admin')
                localStorage.setItem('userRol', 'admin')
            } else if (res.access === 'superAdmin') {
                navigate('/data/superadmin ')
                localStorage.setItem('userRol', 'superAdmin')
            } else if (res.access === 'user') {
                navigate('/data/user')
                localStorage.setItem('userRol', 'user')
            }
            console.log(res.message)
        } catch(error: any) {
            alert(error.response.data.error)
        }
    }

    const recoverPassword = () => {
        navigate('/recoverPassword')
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        await handleAuth(rut, password)
    }

    return (
        <div className="flex">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Ingresar al sistema
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="rut" className="block text-sm font-medium leading-6 text-gray-900">
                                Rut
                            </label>
                            <div className="mt-2">
                                <input
                                id="rut"
                                name="rut"
                                type="rut"
                                autoComplete="rut"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Ingrese su rut..."
                                value={rut}
                                onChange={handleRut}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña:
                                </label>
                                <div className="text-sm">
                                    <button onClick={recoverPassword} className="font-semibold text-cyan-600 hover:text-cyan-500 cursor-pointer">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Ingrese su contraseña..."
                                    onChange={handlePassword}
                                    />
                            </div>
                        </div>

                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmit}
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
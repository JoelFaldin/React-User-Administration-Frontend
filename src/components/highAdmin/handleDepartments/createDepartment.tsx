import { ChangeEvent, useState } from "react"
import dataService from '../../../services/handleRequests'
import EditDepartment from "./editDepartment"
import ActionButtons from "./actionButtons"
import { BiArrowBack } from "react-icons/bi"

// Component's interface:
interface departments {
    name: string,
    id: string,
}

interface departmentComponent {
    onFinish: () => void,
    initialDepartments: Array<any>,
    rerenderDepartment: () => void
}

const createDepartment: React.FC<departmentComponent> = ({ onFinish, initialDepartments, rerenderDepartment }) => {
    const [newDepartmentName, setNewDepartmentName] = useState('')
    const [nameWarning, setNameWarning] = useState(false)
    
    // States to edit:
    const [editState, setEditState] = useState<null | number>(null)

    const handleDepartmentName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewDepartmentName(event.target.value)
        if (event.target.value === '') {
            setNameWarning(true)
        } else {
            setNameWarning(false)
        }
    }

    const handleNewDepartment = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (newDepartmentName === '') {
            setNameWarning(true)
            return
        } else {
            try {
                const jwtToken = localStorage.getItem('jwt')
                await dataService.createDepartment(newDepartmentName, jwtToken)
                setNewDepartmentName('')
                alert('Department created!')
            } catch(error: any) {
                alert(error.response.data.error)
            }
        }
        rerenderDepartment()
    }

    // Function to swap between edit mode and normal mode:
    const toggleEdit = (index: number) => {
        setEditState(prev => prev === index ? null : index)
    }

    return (
        <div className="h-fit max-h-full overflow-y-scroll">
            <button className="w-fit inline-flex items-center mt-10 ml-10 text-xs" title="Go back" onClick={onFinish}>
                <BiArrowBack size={24} />
            </button>
            
            <h1 className="text-center text-xl font-bold p-4">Handle Departments</h1>
            <div className="max-w-6/12 mt-10 mx-auto flex justify-center">
                <section className="pr-9 max-w-fit">
                    <h2 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Existing:</h2>
                    {
                        initialDepartments.length === 0 ? (
                            <p>There are no departments created.</p>
                        ) : (
                            <ul>
                            {initialDepartments.map((element: departments, index: number) => (
                                <li key={`Group${index}`} className="pb-2 mb-8">
                                {editState !== index ? (
                                    <>
                                        <p key={`Department${index}`}>{element.name}</p>
                                        <ActionButtons key={`ActionComponent${index}`} toggleEdit={() => toggleEdit(index)} edit={editState === null ? false : true} id={element.id} rerender={rerenderDepartment} />
                                    </>
                                ) : (
                                    <EditDepartment key={`EditComponent${index}`} id={element.id} element={element} toggleEdit={() => toggleEdit(index)} edit={editState === null ? false : true} rerender={rerenderDepartment} />
                                )}
                                </li>
                            ))}
                            </ul>
                        )
                    }
                </section>
                <section className="pl-9 max-w-fit">
                    <h2 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Create a new one:</h2>
                    <form>
                        <label htmlFor="departmentName" className="block text-sm font-medium leading-6 text-gray-900">Department:</label>
                        <input id="departmentName"
                            name="newDepartment"
                            type="text"
                            required
                            className={nameWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-600 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                            onChange={handleDepartmentName}
                            value={newDepartmentName}
                        />

                        <input id="submitDepartment"
                            name="submit"
                            type="submit"
                            className={nameWarning ? "block w-full mt-4 py-1.5 text-l text-center items-center rounded-md bg-gray-200 px-2 font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10 hover:cursor-default" : "block w-full mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300"}
                            onClick={handleNewDepartment}
                            value="Add department"
                            disabled={nameWarning ? true : false}
                        />
                    </form>
                </section>
            </div>
        </div>
    )
}

export default createDepartment
import { Link } from "react-router-dom"
import HomeIcon from "./Icons/HomeIcon"
import TagIcon from "./Icons/TagIcon"
import ArrowLeftIcon from "./Icons/ArrowLeftIcon"
import AuthService from "../services/AuthService"
import { useAuthContext } from "../context/AuthContext"

function Sidebar() {
  const { setSession } = useAuthContext();

  const signOut = async () => {
    await AuthService.SignOut();
    setSession(null);
  }

  return (
     <div className="w-64 h-screen flex-col justify-between border-e border-gray-100 bg-white">
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          Todo List
        </span>
        <ul className="mt-6 space-y-1">
            <Link to="/">
                <p
                className={`flex flex-row items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 hover:text-orange-700`}
                >
                <HomeIcon />
                Home
                </p>
            </Link>

            <Link to="/categories">
                <p
                className={`flex flex-row items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 hover:text-orange-700`}
                >
                <TagIcon />
                Categorias
                </p>
            </Link>

            <Link to="/signin" onClick={signOut}>
                <p
                className={`flex flex-row items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-orange-100 hover:text-orange-700`}
                >
                <ArrowLeftIcon />
                Cerrar sesión
                </p>
            </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
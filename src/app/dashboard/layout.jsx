import Sidebar from "@/app/UI/Dashboard/Sidebar/sidebar"
import style from "@/app/UI/Dashboard/Dashboard.module.css"

const Layout =({children}) => {
    return (
        <div className={style.container}>
            <div className={style.menu}>
                <Sidebar/>
            </div>
            <div className={style.content}>
            {children}
            </div>
        </div>
    )
}

export default Layout
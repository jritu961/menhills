import { Header } from "../components/header"
import {NavbarComponent} from "../components/navbar"
import { NavbarComponentData } from "../components/navbarContent"
import {DashboardSections} from "../components/dashboard"
import {Footer} from "../components/footer"
export const HomePage=()=>{
    return(<>
    <Header/>
    <NavbarComponent/>
    <NavbarComponentData/>
    <DashboardSections/>
    <Footer/>
    </>)
}
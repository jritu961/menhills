import { Header } from "../components/header"
import {NavbarComponent} from "../components/navbar"
import { NavbarComponentData } from "../components/navbarContent"
import {DashboardSections} from "../components/dashboard"
import HeroSection from "../components/heroSection"
import {Footer} from "../components/footer"
import ProductSection from "../components/product"
export const HomePage=()=>{
    return(<>
    <Header/>
    <NavbarComponent/>
    <NavbarComponentData/>
    <HeroSection/>
    <ProductSection/>
    {/* <DashboardSections/> */}
    <Footer/>
    </>)
}
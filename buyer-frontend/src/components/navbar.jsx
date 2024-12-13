import { NavbarMainContainer,NavbarMiddle,NavbarRight } from "../styles/navbar";
import { UserAddOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';

export const NavbarComponent=()=>{
    return(<>
    <NavbarMainContainer>
        <div></div>
        {/* <NavbarMiddle>MENHILLS</NavbarMiddle> */}
        <NavbarRight>
        <div>
        <UserAddOutlined style={{ fontSize: '24px' }} />
      </div>

      <div >
        <ShoppingCartOutlined style={{ fontSize: '24px' }} />
      </div>

      <div >
        <SearchOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
      </div>

      
        </NavbarRight>
    </NavbarMainContainer>
    </>)
}




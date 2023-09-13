import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthContext } from "src/auth/useAuthContext";
import { Row } from "src/components/elements/styled-components";
import Logo from "src/components/logo/Logo";
import { useSettingsContext } from "src/components/settings";
import { zBottomMenu } from "src/data/data";
import styled from "styled-components";

const Wrappers = styled.header`
position:fixed;
display:flex;
width:100%;
top:0;
left:0;
z-index:10;
background:#fff;
border-bottom:0.1rem solid #e6e6e6;

`

const PaddingTop = styled.div`
padding-top: 73.6px;
@media (max-width:800px) {
    padding-top: 40px;
  }
`
const Menu = styled.div`
padding:1.5rem 1rem 0 1rem;
text-align: center;
display:inline-block;
text-transform:uppercase;
margin:0;
cursor:pointer;
font-weight:bold;
position:relative;
&::after {
  padding-bottom:1.5rem;
  display:block;
  content: '';
  border-bottom:2px solid ${props => props.borderColor};
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}
&:hover:after {
  transform: scaleX(1.2);
}
@media (max-width:800px) {
  display:none;
}
`

const Header = (props) => {
    const router = useRouter();
    const { logout } = useAuthContext();
    const { themeDnsData } = useSettingsContext();

    console.log(zBottomMenu)
    return (
        <>
            <Wrappers>
                <Row style={{ margin: '0 auto', width: '95%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                        <img src={themeDnsData?.logo_img} style={{ height: '29px', width: 'auto' }} onClick={() => {
                            window.location.href = '/user/home'
                        }} />
                        {zBottomMenu.map((item, idx) => (
                            <>
                                <Menu onClick={() => { router.push(item.link) }}>
                                    {item.name}
                                </Menu>
                            </>
                        ))}
                    </Row>
                    <IconButton onClick={async () => {
                        let result = await logout();
                        window.location.href = '/'
                    }}>
                        <Icon icon={'ant-design:logout-outlined'} style={{ color: themeDnsData?.theme_css?.main_color }} />
                    </IconButton>
                </Row>
            </Wrappers>
            <PaddingTop />
        </>
    )
}
export default Header;
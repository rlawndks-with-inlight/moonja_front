import { Icon } from "@iconify/react";
import { Button, Chip, IconButton, Popper, Fade, Paper, Box } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { Col, Row } from "src/components/elements/styled-components";
import Logo from "src/components/logo/Logo";
import { useSettingsContext } from "src/components/settings";
import { zBottomMenu } from "src/data/data";
import { apiManager } from "src/utils/api-manager";
import { commarNumber } from "src/utils/function";
import styled from "styled-components";

const Wrappers = styled.header`
position:fixed;
display:flex;
width:100%;
top:0;
left:0;
z-index:30;
background:#fff;
border-bottom:0.1rem solid #e6e6e6;
padding: 0.5rem;
`

const PaddingTop = styled.div`
padding-top: 91.2px;
@media (max-width:800px) {
    padding-top: 53.2px;
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

    const { logout, user } = useAuthContext();
    const { themeDnsData } = useSettingsContext();
    const [deposit, setDeposit] = useState(0);
    const [popperOpen, setPopperOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [placement, setPlacement] = useState();

    useEffect(() => {
        getDeposit();
    }, []);

    const getDeposit = async () => {
        let result = await apiManager('auth', 'get', { id: 'deposit' });
        setDeposit(result?.deposit ?? 0);
    }

    const handlePopper = (newPlacement) => (event) => {
        setAnchor(event.currentTarget)
        setPopperOpen((prev) => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
    }

    const SendAmount = Math.round(deposit/themeDnsData.setting_obj.sms)

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
                    {user ?
                        <>
                            <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                                <Col style={{ rowGap: '0.5rem', cursor: 'pointer' }} >
                                    <Row
                                        style={{ alignItems: 'center', columnGap: '1rem' }}
                                        onClick={() => {
                                            user?.nickname == '관리자' ? router.push('/manager') : router.push('/user/user-info')
                                        }}>
                                        <Icon icon={'bxs:user'} />
                                        <div>{user?.nickname} ({user?.user_name})</div>
                                    </Row>
                                    <Chip
                                        label={`잔여예치금: ${commarNumber(deposit)}P`}
                                        size="small"
                                        variant="outlined"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handlePopper('bottom-end')}
                                    />
                                </Col>
                                <Button variant="outlined" onClick={async () => {
                                    let result = await logout();
                                    window.location.href = '/'
                                }}>로그아웃</Button>
                                <Popper sx={{ zIndex: 100 }} open={popperOpen} anchorEl={anchor} placement={placement} transition >
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={100} >
                                            <Box boxShadow={3}>
                                                <Paper sx={{ padding: '1rem' }}>
                                                    <Icon
                                                        icon={'bx:x'}
                                                        style={{ width: '2rem', height: '2rem', float: 'right', cursor: 'pointer' }}
                                                        onClick={() => { setPopperOpen(false) }}
                                                    />
                                                    <Table>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                                                    잔여예치금
                                                                </TableCell>
                                                                <TableCell style={{ paddingLeft: '1rem' }}>
                                                                    {commarNumber(deposit)} P
                                                                    <Button style={{ border: '1px solid', marginLeft: '1rem' }} onClick={() => { router.push('/user/pay') }} >
                                                                        충전하기
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                                                    문자 발송<br />가능 건수
                                                                </TableCell>
                                                                <TableCell style={{ paddingLeft: '1rem' }}>
                                                                    {SendAmount}건
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell style={{ borderRight: '1px solid lightgray' }}>
                                                                    입금 전용<br />가상 계좌
                                                                </TableCell>
                                                                <TableCell style={{ paddingLeft: '1rem' }}>
                                                                    미발급
                                                                    <Button style={{ border: '1px solid', marginLeft: '1rem' }} onClick={() => { router.push('/user/pay') }} >
                                                                        발급하기
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Paper>
                                            </Box>
                                        </Fade>
                                    )}
                                </Popper>
                            </Row>
                        </>
                        :
                        <>
                            <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                                <Button variant="outlined">회원가입</Button>
                                <Button variant="outlined" onClick={() => {
                                    router.push('/user/login')
                                }}>로그인</Button>
                            </Row>
                        </>}

                </Row>
            </Wrappers>
            <PaddingTop />
        </>
    )
}
export default Header;
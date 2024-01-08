import { Button, Tab, Tabs, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useAuthContext } from "src/auth/useAuthContext";
import UserLayout from "src/layouts/user/UserLayout";
import { apiManager } from "src/utils/api-manager";
import { toast } from "react-hot-toast";
import { commarNumber } from "src/utils/function";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
`

const UserInfo = () => {
    const router = useRouter();
    const { logout, user } = useAuthContext();
    const [currentTab, setCurrentTab] = useState(0)
    const [dialogOpen, setDialogOpen] = useState([
        { id: 1, dialog: 'password', value: false },
        { id: 2, dialog: 'nickname', value: false },
        { id: 3, dialog: 'phone_num', value: false }
    ])
    const [deposit, setDeposit] = useState(0);
    const [searchClass, setSearchClass] = useState('all')
    const [publish, setPublish] = useState('all')
    const [report, setReport] = useState('all')
    const [changePasswordObj, setChangePasswordObj] = useState("")
    const [changeNicknameObj, setChangeNicknameObj] = useState("")
    const [changePhoneNumObj, setChangePhoneNumObj] = useState("")

    useEffect(() => {
        setCurrentTab(parseInt(router.query?.type ?? 0))
    }, [router.query])

    useEffect(() => {
        getDeposit()
    }, [])

    const getDeposit = async () => {
        let result = await apiManager('auth', 'get', { id: 'deposit' });
        setDeposit(result?.deposit ?? 0);
    }

    const onChangeUserPassword = async () => {
        const params = {
            user_pw: changePasswordObj,
        }
        let result = await apiManager(`auth/change-pw`, 'create', params);
        if (result) {
            toast.success("성공적으로 변경되었습니다.");
            onToggle(1)
        }
    }

    const onChangeUserNickname = async () => {
        const params = {
            nickname: changeNicknameObj,
            phone_num: user.phone_num,
            profile_img: user.profile_img
        }
        let result = await apiManager(`auth/update`, 'create', params);
        if (result) {
            toast.success("성공적으로 변경되었습니다.");
            router.reload()
        }
    }

    const onChangeUserPhoneNum = async () => {
        const params = {
            nickname:user.nickname,
            phone_num: changePhoneNumObj,
            profile_img: user.profile_img
        }
        let result = await apiManager(`auth/update`, 'create', params);
        if (result) {
            toast.success("성공적으로 변경되었습니다.");
            router.reload()
        }
    }

    const handleClassChange = (event) => {
        setSearchClass(event.target.value)
    }

    const handlePublishChange = (event) => {
        setPublish(event.target.value)
    }

    const handleReportChange = (event) => {
        setReport(event.target.value)
    }

    const onToggle = id => {
        const dialogToggle = dialogOpen.map(dialog => dialog.id === id ? { ...dialog, value: !dialog.value } : dialog)
        setDialogOpen(dialogToggle)
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: "url('/assets/background/overlay_2.jpg')" }}>
                <Title style={{ color: '#000', margin: 'auto' }}>마이페이지</Title>
            </BannerContainer>
            <Wrappers>
                <Tabs
                    indicatorColor='primary'
                    textColor='primary'
                    scrollButtons='false'
                    value={currentTab}
                    sx={{
                        width: '100%',
                        margin: '2rem 0 0 0',
                        borderBottom: '1px solid lightgray'
                    }}
                >
                    <Tab label="가입자정보" style={{ flexGrow: 1 }} onClick={() => { router.push('/user/user-info?type=0') }} />
                    <Tab label="사업자정보" style={{ flexGrow: 1 }} onClick={() => { router.push('/user/user-info?type=1') }} />
                    <Tab label="결제내역" style={{ flexGrow: 1 }} onClick={() => { router.push('/user/user-info?type=2') }} />
                    <Tab label="세금계산서" style={{ flexGrow: 1 }} onClick={() => { router.push('/user/user-info?type=3') }} />
                </Tabs>
                {currentTab == 0 &&
                    <>
                        <Table style={{ width: '50%', margin: '2rem auto' }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        아이디
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        {user?.user_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        비밀번호
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <Button style={{ border: '1px solid' }} onClick={() => { onToggle(1) }}>
                                            변경하기
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        닉네임
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        {user?.nickname}
                                        <Button style={{ border: '1px solid', marginLeft: '1rem' }} onClick={() => { onToggle(2) }}>
                                            변경하기
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        주소
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        세종특별자치시 한누리대로 2009
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        전화번호
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        {user?.phone_num}
                                        <Button style={{ border: '1px solid', marginLeft: '1rem' }} onClick={() => { onToggle(3) }}>
                                            변경하기
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        이메일
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        kimin6756@naver.com
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        충전계좌
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <Button style={{ border: '1px solid' }} onClick={() => { router.push('/user/pay') }}>등록하기</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Dialog style={{}} open={dialogOpen[0].value} onClose={() => { onToggle(1) }}>
                            <DialogTitle>비밀번호 변경</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    새 비밀번호를 입력해주세요<br /><br />
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    type="password"
                                    margin='dense'
                                    label='새 비밀번호'
                                    onChange={(e) => {
                                        setChangePasswordObj(e.target.value)
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant='contained' onClick={onChangeUserPassword}>
                                    변경
                                </Button>
                                <Button color='inherit' onClick={() => {
                                    onToggle(1)
                                }}>
                                    취소
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog style={{}} open={dialogOpen[1].value} onClose={() => { onToggle(2) }}>
                            <DialogTitle>닉네임 변경</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    새 닉네임을 입력해주세요<br /><br />
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin='dense'
                                    label='새 닉네임'
                                    onChange={(e) => {
                                        setChangeNicknameObj(e.target.value)
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant='contained' onClick={onChangeUserNickname}>
                                    변경
                                </Button>
                                <Button color='inherit' onClick={() => {
                                    onToggle(2)
                                }}>
                                    취소
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog style={{}} open={dialogOpen[2].value} onClose={() => { onToggle(3) }}>
                            <DialogTitle>전화번호 변경</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    새 전화번호를 입력해주세요<br /><br />
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin='dense'
                                    label='새 전화번호'
                                    onChange={(e) => {
                                        setChangePhoneNumObj(e.target.value)
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant='contained' onClick={onChangeUserPhoneNum}>
                                    변경
                                </Button>
                                <Button color='inherit' onClick={() => {
                                    onToggle(3)
                                }}>
                                    취소
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                }
                {currentTab == 1 &&
                    <>
                        <Row style={{ width: '30%', margin: '2rem auto', fontWeight: 'bold', fontSize: 'large', }}>
                            <br />현재 개인 사용자로 등록되어 있습니다.<br /><br />사업 사용자로 변경하시겠습니까?<br />
                        </Row>
                        <Button style={{ border: '1px solid', width: '33%', margin: '0 auto', fontSize:'large' }}>사업 사용자로 변경하기</Button>
                    </>
                }
                {currentTab == 2 &&
                    <>
                        <Table style={{ width: '50%', margin: '2rem auto' }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        잔여예치금
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        {commarNumber(deposit)} P
                                        <Button style={{ border: '1px solid', marginLeft: '1rem' }} onClick={() => { router.push('/user/pay') }} >
                                            충전하기
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        분류
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <Select value={searchClass} onChange={handleClassChange}>
                                            <MenuItem value={'all'}>전체</MenuItem>
                                            <MenuItem value={'used'}>사용완료</MenuItem>
                                            <MenuItem value={'unused'}>미사용</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        조회기간
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <DatePicker label='조회 시작 날짜' /> 부터<br />
                                        <DatePicker label='조회 종료 날짜' /> 까지
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        정렬
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <FormControl>
                                            <RadioGroup defaultValue='descending'>
                                                <FormControlLabel value='descending' control={<Radio />} label='날짜 내림차순' />
                                                <FormControlLabel value='ascending' control={<Radio />} label='날짜 오름차순' />
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button variant='contained' style={{ border: '1px solid', width: '50%', margin: '0 auto', fontSize:'large' }}>조회하기</Button>
                    </>
                }
                {currentTab == 3 &&
                    <>
                        <Table style={{ width: '50%', margin: '2rem auto' }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        발행상태
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <Select value={publish} onChange={handlePublishChange}>
                                            <MenuItem value={'all'}>전체</MenuItem>
                                            <MenuItem value={'publishing'}>진행중</MenuItem>
                                            <MenuItem value={'completed'}>교부완료</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        신고상태
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <Select value={report} onChange={handleReportChange}>
                                            <MenuItem value={'all'}>전체</MenuItem>
                                            <MenuItem value={'not'}>미신고</MenuItem>
                                            <MenuItem value={'reporting'}>진행중</MenuItem>
                                            <MenuItem value={'reported'}>신고완료</MenuItem>
                                            <MenuItem value={'failed'}>신고실패</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        조회기간
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <DatePicker label='조회 시작 날짜' /> 부터<br />
                                        <DatePicker label='조회 종료 날짜' /> 까지
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        정렬
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <FormControl>
                                            <RadioGroup defaultValue='descending'>
                                                <FormControlLabel value='descending' control={<Radio />} label='날짜 내림차순' />
                                                <FormControlLabel value='ascending' control={<Radio />} label='날짜 오름차순' />
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button variant="contained" style={{ border: '1px solid', width: '50%', margin: '0 auto', fontSize:'large' }}>조회하기</Button>
                    </>
                }
            </Wrappers>
        </>
    )
}
UserInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>
export default UserInfo
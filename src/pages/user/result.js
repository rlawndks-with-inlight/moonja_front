import UserLayout from 'src/layouts/user/UserLayout';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { Button, Tab, Tabs, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
`

const Result = () => {

    const [searchClass, setSearchClass] = useState('all')

    const handleClassChange = (event) => {
        setSearchClass(event.target.value)
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: "url('/assets/background/overlay_2.jpg')", backgroundPosition:'50% 80%' }}>
                <Title style={{ color: '#000', margin: 'auto' }}>발송 내역</Title>
                <Title2 style={{ marginTop: '2rem auto auto auto' }}>문자 발송 결과를 확인해보세요</Title2>
            </BannerContainer>
            <Wrappers>
            <Table style={{ width: '50%', margin: '2rem auto' }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                        문자종류
                                    </TableCell>
                                    <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                        <Select value={searchClass} onChange={handleClassChange}>
                                            <MenuItem value={'all'}>전체</MenuItem>
                                            <MenuItem value={'message'}>일반문자</MenuItem>
                                            <MenuItem value={'ad'}>광고문자</MenuItem>
                                            <MenuItem value={'election'}>선거문자</MenuItem>
                                            <MenuItem value={'kakao-alim'}>카카오 알림톡</MenuItem>
                                            <MenuItem value={'kakao-friend'}>카카오 친구톡</MenuItem>
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

            </Wrappers>
        </>
    )
}

Result.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Result
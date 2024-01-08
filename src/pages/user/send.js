import UserLayout from 'src/layouts/user/UserLayout';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { Button, Tab, Tabs, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
`

const Send = () => {

    const [messageType, setMessageType] = useState('선택하세요')

    const handleTypeChange = (event) => {
        setMessageType(event.target.value)
    }

    return (
        <>
            <BannerContainer style={{ backgroundImage: "url('/assets/background/overlay_2.jpg')" }}>
                <Title style={{ color: '#000', margin: 'auto' }}>문자 발송</Title>
                <Title2 style={{ marginTop: '2rem auto auto auto', }}>간단하고 빠르게 문자를 보내세요</Title2>
            </BannerContainer>
            <Wrappers>
                <Table style={{ width: '50%', margin: '2rem auto' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                문자종류
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                <Select
                                    value={messageType}
                                    onChange={handleTypeChange}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>선택하세요</em>
                                        }
                                        return selected
                                    }} >
                                    <MenuItem value={'일반문자'}>일반문자</MenuItem>
                                    <MenuItem value={'광고문자'}>광고문자</MenuItem>
                                    <MenuItem value={'선거문자'}>선거문자</MenuItem>
                                    <MenuItem value={'카카오 알림톡'}>카카오 알림톡</MenuItem>
                                    <MenuItem value={'카카오 친구톡'}>카카오 친구톡</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                발신번호
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                <TextField
                                    fullWidth
                                    margin='dense'
                                    label='발신번호'
                                    onChange={(e) => {
                                        //e.target.value를 받아 발신번호 저장
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                수신번호
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    margin='dense'
                                    label='수신번호'
                                    onChange={(e) => {
                                        //e.target.value를 받아 수신번호 저장
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                발송설정
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                <FormControl>
                                    <RadioGroup defaultValue='now'>
                                        <FormControlLabel value='now' control={<Radio />} label='즉시발송' />
                                        <FormControlLabel value='reserve-all' control={<Radio />} label='예약발송-일괄' />
                                        <FormControlLabel value='reserve-div' control={<Radio />} label='예약발송-분할' />
                                    </RadioGroup>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                문자내용
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    margin='dense'
                                    label='문자내용'
                                    onChange={(e) => {
                                        //e.target.value를 받아 문자내용 저장
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Row style={{ margin: '0 25%' }}>
                    <Button style={{ border: '1px solid', width: '100%', marginRight: '1rem', fontSize: 'large' }}>테스트 발송</Button>
                    <Button variant='contained' style={{ border: '1px solid', width: '100%', marginLeft: '1rem', fontSize: 'large' }}>실제 발송</Button>
                </Row>
            </Wrappers>
        </>
    )
}

Send.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Send
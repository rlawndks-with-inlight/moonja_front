import UserLayout from 'src/layouts/user/UserLayout';
import styled from 'styled-components';
import { Button, Tab, Tabs, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import { Col, Row, Title, Title2, Title3, Wrappers } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useSettingsContext } from 'src/components/settings';

const BannerContainer = styled.div`
    width:100%;
    padding: 80px 0;
    background-size: cover;
    display:flex;
    flex-direction:column;
`

const Pay = () => {
 
    const {themeDnsData} = useSettingsContext();

    const [payment, setPayment] = useState()

    const RealPayment = Math.round(payment*11000)

    const SendAmount = Math.round(RealPayment/themeDnsData.setting_obj.sms)

    const handlePaymentChange = (e) => {
        let value = e.target.value;
        if((value[value.length -1] <=9 && value[value.length -1] >=0) || value.length == 0){
            setPayment(value);
        }
    }
    console.log(themeDnsData)
    return (
        <>
            <BannerContainer style={{ backgroundImage: "url('/assets/background/overlay_3.jpg')" }}>
                <Title style={{ color: '#000', margin: 'auto' }}>결제</Title>
                <Title2 style={{ marginTop: '2rem auto auto auto', }}>간단하고 빠르게 문자를 보내세요</Title2>
            </BannerContainer>
            <Wrappers>
                <Table style={{ width: '50%', margin: '2rem auto' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                입금 전용<br />가상 계좌
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                미발급
                                <Button style={{ border: '1px solid', marginLeft: '1rem' }} onClick={() => { router.push('/user/pay') }} >
                                    발급하기
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                충전 단위<br />(만원)
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                <TextField
                                    value={payment}
                                    margin='dense'
                                    label='충전 단위'
                                    onChange={handlePaymentChange}
                                    InputProps={{
                                        endAdornment:<div style={{width:'50px'}}>
                                            만원
                                        </div>
                                    }}
                                />
                                <br />부가세 10%를 더한
                                <Row style={{color:'red'}}>최종 결제 금액 : {RealPayment ? RealPayment : '0'}원</Row>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                문자 발송<br />가능 건수
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                충전하시는 금액으로<br />발송 가능한 문자 건수는<br />
                                총 {SendAmount? SendAmount : '0'}건
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 'large', borderRight: '1px solid lightgray' }}>
                                결제 방식
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', paddingLeft: '2rem' }}>
                                계좌 이체
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Row style={{ margin: '0 25%' }}>
                    <Button variant='contained' style={{ border: '1px solid', width: '100%', marginRight: '1rem', fontSize: 'large' }}>결제하기</Button>
                </Row>
            </Wrappers>
        </>
    )
}

Pay.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Pay
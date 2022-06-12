import React,{useState} from 'react'
import {styled} from "@mui/material";
import { Icon } from '../../atoms';
import ModalTitle from '../../atoms/Modal/ModalTitle'

function CustomDate({setCustomDate,onCloseCalendar}) {
    const [range,setRange] = useState([...Array(31)])
    return (
    <Container>
      <Calendar>
        <Header>
                <ModalTitle data-testid='choose-custom-date'>Choose custom date</ModalTitle>
                <CloseIcon onClick={onCloseCalendar}>
                    <Icon name="close" />
                </CloseIcon>

            </Header>       
            <Days>
            {range.map((_, i) => (
                <Ranges onClick={() => setCustomDate(i + 1)}>{i + 1} </Ranges>
            ))}
            </Days>
      </Calendar>
    </Container>
    )
}
const Days = styled("div")({
    width: "100%",
    display: "flex",
    flexWrap: "wrap"
})
const CloseIcon = styled("div")({
   
})
const Ranges = styled("div")({
    fontSize: "13px",
    margin: "5px",
    width: "calc(9.2rem / 7)",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignTtems: "center",
    color: "#222222",
    '&:hover': {
        color: "#222222",
        border: "1px solid #222222",
        borderRadius: "50%",
        cursor: "pointer",
      },
})
const Container = styled("div")({
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
})    
const Calendar = styled("div")({ 
        backgroundColor: "#f6f6f6",
        boxShadow: "0 0.5rem 3rem rgba(0, 0, 0, 0.1)",
        position:"absolute",
        zIndex: 999
      }
)
const Header = styled("div")({
    padding: "1.2em 1.5em",
    // background: '#555555',
    // color: '#fff',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottom: "1px solid #E1E1E1",
    width: "100%",
});

export default CustomDate

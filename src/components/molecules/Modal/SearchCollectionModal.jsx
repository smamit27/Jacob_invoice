import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  AllCheckerCheckbox,
  Checkbox,
  CheckboxGroup
} from "@createnl/grouped-checkboxes";
import { Button, Grid, Stack, Box, Typography,DialogActions,DialogContent,DialogTitle} from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { getSearchCollectionDetails } from "../../../redux/api/action";
import { similarCodeSearch,showSearchCollectionList ,showSearchCollectionInBasic} from "../../../redux/common/action";

import { Icon } from '../../atoms';

const BoxStyle = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: #dcdcdc;
`;
const CheckboxWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled("label")`
  text-align: left;
  display: flex;
  margin-bottom: 5px;
  font-family: Jacobs Chronos !important;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #222222;
  margin-left: 5px;
`;
const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);
const Input = styled("input")`
  padding: 10px;
  border: 1px solid #ccc;
  width: 300px;
  border-radius: 5px;
  height: 40px;
`;
const Footer = styled("div")`
display: flex;
align-items: flex-end;
justify-content: flex-end;
`;
const StyledTag = styled("div")`
  display: flex;
  align-items: flex-start;
`;
const Delete = styled("span")`
margin-top:8px;
margin-right: 10px`;
const Description = styled("span")`
  margin-right: 10px;
  margin-top:10px;
`;

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      style={{ color: '#000000', fontWeight: 700 }}
      sx={{ m: 0, p: 2 }}
      {...other}
    >
      {children}
    </DialogTitle>
  );
};

function SearchCollectionModal(props) {
  const {setOpen} = props;
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [,setOnChange] = useState({}); 
  const [itemValue,setItemValue] = useState([]);
  const [inputSearchCollectionCode,setInputSearchCollectionCode] = useState("")
  const { getSearchCollection } = useSelector(({ api }) => api);
  const { searchCollectionListCode} = useSelector(({ common }) => common);

  useEffect(() => {
    dispatch(similarCodeSearch(itemValue));
    return () => {};
  }, [itemValue]);
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if(value.length > 0){
      dispatch(getSearchCollectionDetails(value));
    }
    setInputSearchCollectionCode(value);

  };
 
  const searchCollectionCode = (panel, expanded) => {
    for (let item of itemValue) {
      if (item.ID === panel.ID) {
        item.expand = !panel.expand;
      }
    }
    setExpanded(panel ? panel : false);
  };
  const searchCollectionList =  (selectValue) => {
    const currentItem = itemValue.map(d=>d.ID).includes(selectValue.ID)
      if(currentItem){
        dispatch(showSearchCollectionList(false))
      }
      else {
        setItemValue((prevArr) => ([...prevArr, selectValue]));
        setInputSearchCollectionCode("");
        dispatch(showSearchCollectionList(false))
      }
  }
  const deleteSelectSimilarCode = (id) => {
    const newList = itemValue.filter((item) => item.ID !== id)
    setItemValue(newList)
    dispatch(similarCodeSearch(newList));
  }
  const handleSelect = () =>{
    dispatch(showSearchCollectionInBasic(true));
    setOpen(false)
  }
  const handleClose =() =>{
    dispatch(similarCodeSearch([]));
    setOpen(false)
  } 


  return (
    <>
      <BootstrapDialogTitle id="customized-dialog-title">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">
            Select the collection/s you want to duplicate from
          </Typography>
          <div onClick={handleClose}>
            <Icon name="close" />
          </div>
        </Box>
      </BootstrapDialogTitle>

      <DialogContent dividers style={{ minHeight: "350px", height: "auto" }}>
        <Grid item xs={12}>
          <Box mt={1}>
            <div >
              <Label >Search Collection </Label>
              <Input
                type="text"
                name="search_collection"
                placeholder="Please name the collection"
                value={inputSearchCollectionCode}
                onChange={handleInputChange}
              />
            </div> 
          </Box>
          {searchCollectionListCode ? (
              <Listbox>
                {getSearchCollection.length > 0 && getSearchCollection.map((option, index) => (
                  <li onClick={(event) => searchCollectionList(option)} key={option.ID}>
                    <span>{option.Description}</span>
                  </li>
                ))}
            </Listbox>
            ): null}


          {itemValue.length > 0 && (
            <Box mt={3}>
              {itemValue.length > 0 && itemValue.map((option, index) => (
                <Accordion key={option.ID}
                  expanded={expanded.expand}
                  onChange={(e) => {
                    searchCollectionCode(option, expanded);
                  }}
                >
                  <div>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      style={{ backgroundColor: "#DCDCDC" }}

                    >
                      <Box>
                      <StyledTag>
                      <Delete onClick={() => deleteSelectSimilarCode(option.ID)}><Icon name="close" /></Delete>
                      <Description>{option.Description}</Description>                     
                        </StyledTag>
                      </Box>
                    </AccordionSummary>
                  </div>
                  <AccordionDetails>
                    <Typography>
                      what feautures do you want to copy from the collection?
                    </Typography>
                    <CheckboxGroup onChange={setOnChange}>
                      <CheckboxWrapper>
                        <Box display="flex" flexDirection="column">
                          <BoxStyle>
                            <AllCheckerCheckbox className="regular-checkbox" />
                            <Label>Select All</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox className="regular-checkbox" />
                            <Label>Billing titles</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox className="regular-checkbox" />
                            <Label>Billing Schedule</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox className="regular-checkbox" />
                            <Label>User Defined Fields</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox className="regular-checkbox" />
                            <Label>Indirect Rates Schedule</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox className="regular-checkbox" />
                            <Label>Indirect Rate Types</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox className="regular-checkbox" />
                            <Label>Funding Types</Label>
                          </BoxStyle>
                        </Box>

                        <Box display="flex" flexDirection="column">
                          <BoxStyle>
                            <Checkbox name="af" className="regular-checkbox" />
                            <Label>Map Expenditures</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox name="af" className="regular-checkbox" />
                            <Label>Small Business Codes</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox name="af" className="regular-checkbox" />
                            <Label>Reports</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox name="af" className="regular-checkbox" />
                            <Label>Contract Expenditure Groups</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox name="af" className="regular-checkbox" />
                            <Label>Subcontractor Invoice Imports</Label>
                          </BoxStyle>
                          <BoxStyle>
                            <Checkbox name="af" className="regular-checkbox" />
                            <Label>Monthly Status Reporting</Label>
                          </BoxStyle>
                        </Box>
                      </CheckboxWrapper>
                    </CheckboxGroup>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
      <Footer>
            <Grid container spacing={3} flexWrap="wrap">
                <Grid item alignSelf="flex-end" >
                    <Stack spacing={2} direction="row" >
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button variant="contained" disabled={itemValue.length === 0}  pr={1} onClick={handleSelect}>Select</Button>
                    </Stack>
                  </Grid>
            </Grid>
      </Footer>
        </DialogActions>
    </>
  );
}

export default SearchCollectionModal;

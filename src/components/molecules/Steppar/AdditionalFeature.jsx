import {
  AllCheckerCheckbox,
  Checkbox,
  CheckboxGroup,
} from "@createnl/grouped-checkboxes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import { Box, TextField, Tooltip } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import styled from "styled-components";
const Label = styled.label`
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

const BoxStyle = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: #dcdcdc;
`;
const CheckboxWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
`;
const AdditionalFeature = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onChangePercentage = (e) => {
    setPercentageFunds(e.target.value);
  };
  const [, setOnChange] = React.useState({});
  const [showOnChange] = React.useState(true);
  const [percentageFunds, setPercentageFunds] = React.useState();
  const [checked, setChecked] = React.useState(false);

  const onClickCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <Typography p={2}>
        What additional functionality do you need? (select all that apply)
      </Typography>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            borderTop: "1px solid #eeeeee",
            borderBottom: "1px solid #eeeeee",
          }}
        >
          <Box>
            <Typography sx={{ flexShrink: 0 }}>Financial Tracking</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxGroup onChange={setOnChange}>
            <CheckboxWrapper>
              <Box>
                <BoxStyle>
                  <AllCheckerCheckbox className="regular-checkbox" />

                  <Label>Select All</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="tfa" className="regular-checkbox" />

                  <Label>Track Funds Authorized by the Client</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="af" className="regular-checkbox" />

                  <Label>Allocate Funds by %(Prorate)</Label>
                </BoxStyle>{" "}
              </Box>

              <Box ml={25}>
                <BoxStyle>
                  <Checkbox name="afs" className="regular-checkbox" />

                  <Label>Allocate Funds to Specific Tasks</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="hof" className="regular-checkbox" />

                  <Label>Holdback of Funding (Not Retention)</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="ecm" className="regular-checkbox" />

                  <Label>Enforce Contract Maximum/Ceilings)</Label>
                </BoxStyle>
              </Box>

              <Box ml={25}>
                <BoxStyle>
                  <Checkbox name="utp" className="regular-checkbox" />

                  <Label>Utilize Time Phased Budgets</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="tel" className="regular-checkbox" />

                  <Label>Track Expenditure Level Budgets</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="scp" className="regular-checkbox" />

                  <Label>Setup Contract Periods</Label>
                </BoxStyle>
              </Box>
            </CheckboxWrapper>
          </CheckboxGroup>

          {/* </CheckboxWrapper> */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          style={{ borderBottom: "1px solid #eeeeee" }}
        >
          <Typography sx={{ flexShrink: 0 }}>Client Billing Setup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxGroup onChange={setOnChange}>
            <CheckboxWrapper>
              <Box>
                <BoxStyle>
                  <AllCheckerCheckbox className="regular-checkbox" />
                  <Label>Select All</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="baf" className="regular-checkbox" />
                  <Label>
                    Bill Award Fees, Performance Fees and other fees to the
                    client
                  </Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="ijc" className="regular-checkbox" />
                  <Label>
                    Invoice Jacobs costs to a JV as a teaming subcontractor
                  </Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="sts" className="regular-checkbox" />
                  <Label>Setup Teaming subcontractor invoicing</Label>
                </BoxStyle>
              </Box>

              <Box ml={22}>
                <BoxStyle>
                  <Checkbox name="ats" className="regular-checkbox" />
                  <Label>
                    Add Teaming subcontractor markups on labor and/or expense
                  </Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="cpa" className="regular-checkbox" />
                  <Label>
                    Change project attributes according to client requirements
                  </Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="ctt" className="regular-checkbox" />
                  <Label>
                    Change tasks attributes according to client requirements
                  </Label>
                </BoxStyle>
              </Box>

              <Box ml={22}>
                <BoxStyle>
                  <Checkbox name="smt" className="regular-checkbox" />
                  <Label>
                    Structure my tasks according to client requirements
                  </Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="cxa" className="regular-checkbox" />
                  <Label>
                    Change expenditures attributes according to client
                    terminology
                  </Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="bai" className="regular-checkbox" />
                  <Label>Bill an Intercompany Work Agreement (IWA)</Label>
                </BoxStyle>
              </Box>
            </CheckboxWrapper>
          </CheckboxGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          style={{ borderBottom: "1px solid #eeeeee" }}
        >
          <Typography sx={{ flexShrink: 0 }}>Travel Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxGroup onChange={setOnChange}>
            <CheckboxWrapper>
              <Box>
                <BoxStyle>
                  <AllCheckerCheckbox className="regular-checkbox" />
                  <Label>Select All</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="rtt" className="regular-checkbox" />

                  <Label>Report Trips to client in detail</Label>
                </BoxStyle>
              </Box>

              <Box ml={30}>
                <BoxStyle>
                  <Checkbox name="cat" className="regular-checkbox" />
                  <Label>Calculate and track travel Per Diem</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="uft" className="regular-checkbox" />
                  <Label>US Federal travel threshold validation</Label>
                </BoxStyle>
              </Box>

              <Box ml={30}>
                <BoxStyle>
                  <Checkbox name="lte" className="regular-checkbox" />
                  <Label>Local tax exemptions</Label>
                </BoxStyle>
              </Box>
            </CheckboxWrapper>
          </CheckboxGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          style={{ borderBottom: "1px solid #eeeeee" }}
        >
          <Typography sx={{ flexShrink: 0 }}>
            Invoicing & Reporting Presentation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxGroup onChange={setOnChange}>
            <CheckboxWrapper>
              <Box>
                <BoxStyle>
                  <AllCheckerCheckbox className="regular-checkbox" />
                  <Label>Select All</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="sbr" className="regular-checkbox" />
                  <Label>Small business reports</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="sdb" className="regular-checkbox" />
                  <Label>Subcontractor Details (Billing, Retainage.)</Label>
                </BoxStyle>
              </Box>

              <Box ml={25}>
                <Box display="flex" flexDirection="row">
                  <BoxStyle>
                    <Checkbox name="tss" className="regular-checkbox" />
                    <Label>Teaming Subcontractor Summary</Label>
                    <Tooltip title="Additional Functionality ">
                      <InfoIcon style={{ color: "#928484" }} />
                    </Tooltip>
                  </BoxStyle>
                </Box>

                <BoxStyle>
                  <Checkbox name="tss" className="regular-checkbox" />
                  <Label>
                    Teaming subcontractor small business designation
                  </Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="mpi" className="regular-checkbox" />
                  <Label>Multi-project Invoice Summary</Label>
                </BoxStyle>
              </Box>

              <Box ml={25}>
                <BoxStyle>
                  <Checkbox name="fcr" className="regular-checkbox" />
                  <Label>First Charge Report by Collection</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="rli" className="regular-checkbox" />
                  <Label>Report Line Item Sorting</Label>
                </BoxStyle>
                <BoxStyle>
                  <Checkbox name="er" className="regular-checkbox" />
                  <Label>Event Reconciliations</Label>
                </BoxStyle>
              </Box>
            </CheckboxWrapper>
          </CheckboxGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
          style={{ borderBottom: "1px solid #eeeeee" }}
        >
          <Typography sx={{ flexShrink: 0 }}>Indirect Rates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxGroup onChange={setOnChange}>
            <CheckboxWrapper>
              <Box>
                <BoxStyle>
                  <AllCheckerCheckbox className="regular-checkbox" />
                  <Label>Select All</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox name="soc" className="regular-checkbox" />
                  <Label>
                    See overhead components (Raw, Fringe, G&A, Overhead)
                  </Label>
                </BoxStyle>
              </Box>

              <Box ml={30}>
                <BoxStyle>
                  <Checkbox name="acr" className="regular-checkbox" />
                  <Label>Assign capped rates</Label>
                </BoxStyle>
              </Box>

              <Box ml={30}>
                <BoxStyle>
                  <Checkbox name="amr" className="regular-checkbox" />
                  <Label>Assign minimum rates</Label>
                </BoxStyle>
              </Box>
            </CheckboxWrapper>
          </CheckboxGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          style={{ borderBottom: "1px solid #eeeeee" }}
        >
          <Typography sx={{ flexShrink: 0 }}>Notification Setup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckboxGroup onChange={setOnChange}>
            <CheckboxWrapper>
              <Box>
                <BoxStyle>
                  <AllCheckerCheckbox className="regular-checkbox" />
                  <Label>Select All</Label>
                </BoxStyle>

                <BoxStyle>
                  <Checkbox
                    name="rnw"
                    onClick={onClickCheckbox}
                    className="regular-checkbox"
                  />
                  <Label>Receive Notification when X % Funds Used</Label>
                </BoxStyle>
                {checked ? (
                  <Box>
                    <Label>Percentage Funds Used</Label>
                    <TextField
                      type="number"
                      size="small"
                      name="percentageFunds"
                      value={percentageFunds}
                      onChange={onChangePercentage}
                    ></TextField>
                  </Box>
                ) : null}
              </Box>

              <Box ml={22}>
                <BoxStyle>
                  <Checkbox name="rn" className="regular-checkbox" />
                  <Label>
                    Receive Notification X days before contract or period end
                    date
                  </Label>
                </BoxStyle>
              </Box>

              <Box ml={22}>
                <BoxStyle>
                  <Checkbox name="kwp" className="regular-checkbox" />
                  <Label>Know when PO funds are X % spent</Label>
                </BoxStyle>
              </Box>
            </CheckboxWrapper>
          </CheckboxGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default AdditionalFeature;

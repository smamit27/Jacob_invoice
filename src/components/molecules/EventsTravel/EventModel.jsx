import { Button, Dialog } from "@mui/material";
import './Events.css'
import React, { useState, useEffect } from 'react'
import {
    Select,
    MenuItem,
    TextField,
} from "@mui/material";


const options = [
    { id: "1", value: "Spring", label: "Spring" },
    { id: "2", value: "Summer", label: "Summer" },
    { id: "3", value: "Autumn", label: "Autumn" },
    { id: "4", value: "Winter", label: "Winter" }
];

export function EventModel(props) {
    let open = props.open;
    const [isValid, setIsValid] = useState(false)

    const [formData,setFormData] =useState({templateName:'',calculationType:'',eventCategory:'',oracleEventType:''})
    
    useEffect(() => {
        if (Object.values(formData).every((e) => e.length != 0)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [formData])

    const handleCancel = () => {
        props.close();
    }

    const handleCreate = () => {
        alert('create button clicked');
    }

    const handleChange = (event) => {
        setFormData((prevState) =>  ({...prevState,[event.target.name]: event.target.value}))
    };
    console.log('state: ', formData);

    return (
        <Dialog open={open} fullWidth={true} maxWidth='sm'>
            <div >
                <div className="createEventModel__header">
                    <span className="createEventModel__headerText"><strong>New Event Template</strong></span>
                </div>
                <div className="createEventModel__body">
                    <div className="modelForm">
                        <div>
                            <span><strong>Setup Basic Details</strong></span>
                            <div className="modelFormSection">
                                <div>
                                    <span>
                                        Template Name
                                    </span>
                                    <TextField onChange={handleChange} name="templateName" value={formData.templateName} id="outlined-basic" size="small"  variant='outlined' />
                                </div>
                                <div>
                                    <span>
                                        Calculation Type
                                    </span>
                                    <Select
                                        className='modelSelect'
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.calculationType}
                                        label="Age"
                                        name="calculationType"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <span><strong>Parameters</strong></span>
                            <div className="modelFormSection">
                                <div>
                                    <div>
                                    <span>
                                        Event Category
                                    </span>
                                    </div>
                                    <Select
                                        className='modelSelect'
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.eventCategory}
                                        label="Age"
                                        name="eventCategory"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <span><strong>Event Details</strong></span>
                            <div className="modelFormSection">
                                <div>
                                    <div>
                                    <span>
                                       Oracle Event Type
                                    </span>
                                    </div>
                                    <Select
                                        className='modelSelect'
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.oracleEventType}
                                        label="Age"
                                        name='oracleEventType'
                                        onChange={handleChange}
                                        disabled={!formData.eventCategory}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <div className="modelButtonContainer">
                        <Button className="addRow" size="small" variant="contained" color="secondary" onClick={handleCancel } >Cancle</Button>
                        <Button size="small" variant="contained" color="secondary" disabled={!isValid} onClick={handleCreate} >Create</Button>
                    </div>
                </div>
            </div>

        </Dialog>

    )
}

import {
    Modal,
    Box,
    styled,
    Button,
    Stack,
    Grid,
    TextField,
    Select,
    FormControl,
    MenuItem
} from "@mui/material";
import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { DesktopDatePicker } from '@mui/lab';
import { billingThroughDateTableAction ,billingThroughDateJacobsAction} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
    backDropLoaderCloseAction,
    backDropLoaderOpenAction,
} from "../BackDropLoader/logic";
import { importSetupColumns } from './constants'
import DataGrid from 'react-data-grid'
import { format ,differenceInWeeks} from 'date-fns';
import { Icon, ModalTitle } from '../../atoms';
import CustomDate from "./CustomDate";

function SetupBilling({ open = false, onClose = () => null ,onSaveOptions}) {
    const { handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [billingFrequency, setBillingFrequency] = useState('')
    const [billThrough, setBillThrough] = useState('')
    const [displayBillPreview, setDisplayBillPreview] = useState(false)
    const [customDatePicker, setCustomDatePicker] = useState(false)    
    const [rowsData, setRowsData] = useState([])
    const [columnsData, setColumnsData] = useState(importSetupColumns)
    const selectedRows = useRef([])
    const collectionId = useSelector(state => state.getCollectionId)

    const [staticCalendarDate,setStaticCalendarDate] = useState([{
        SEQ_NUM: "jacobs_date",BILL_THROUGH: "Last Friday of Month -  Jacob’s fiscal Calendar"
      },
      {
        SEQ_NUM: "custom_date",BILL_THROUGH: "Enter Custom Dates"
      }
    ])
    const { data: allBillingFrequency } = useIntialSelector('billingFrequencyTableReducer')
    console.log(allBillingFrequency)
    const { data: allBillingThroughDate } = useIntialSelector('billingThroughDateTableReducer')
    const { data: allBillingThroughDateJacobs,flag: billingThroughDateJacobsFlag } = useIntialSelector('billingThroughDateJacobsReducer')
    const onDateChange = (val, type) => {
        try {
            if (type === 'start') {
                setStart(val)
                setEnd(null)
            } else {
                setEnd(val)
            }
        } catch (error) {
            if (type === 'start') {
                setStart(null)
                setEnd(null)
            } else {
                setEnd(null)
            }
        }
    }


      useEffect(() => {
        if (billingThroughDateJacobsFlag) {
            const currentDate =  new Date(); 
            const jacobsCalenderDate =  allBillingThroughDateJacobs.map(d => ({
                BILLING_START_DATE: d.starT_DATE,
                BILL_THROUGH_DATE: d.enD_DATE,
                BILLING_PERIOD_NAME: d.perioD_NAME ,
                BILLING_TYPE: d.perioD_TYPE === 'Month' ? "Monthly":d.perioD_TYPE,
                ADDED_DATE: format(currentDate, 'dd-MMM-yyyy'),
                ADDED_BY: "",
                UPDATED_DATE: format(currentDate, 'dd-MMM-yyyy'),
                UPDATED_BY: "",          
              }))
              setRowsData(jacobsCalenderDate)
        }
      }, [billingThroughDateJacobsFlag])
    //   useEffect(() => {
    //     if (saveError) {
    //       dispatch(backDropLoaderCloseAction())
    //     }
    //   }, [saveError])

   

    const onSubmit = () => {
        setDisplayBillPreview(true)
        // setRowsData();
    }
    const onBillThroughDateChange = (event) => {
        const {value} = event.target;
        setCustomDatePicker(false)
        setBillThrough(value)
        if(value === "custom_date") {
            setCustomDatePicker(true)
        }

    }
    const onBillingFrequency = (e) => {
        setBillingFrequency(e.target.value)
        dispatch(billingThroughDateTableAction({ frequencyName: e.target.value }))
    }
    const previewBillingPeriod = () => {
        let seq_num = billThrough;
        let startDate = start;
        let endDate = end;
                            
        const seqNumber  = seq_num === 13 || seq_num === 14 || seq_num === 15 || seq_num === 16 || seq_num === 17 || 
                          seq_num === 18 || seq_num === 19 || seq_num === 20 || seq_num === 21 || seq_num === 22 || seq_num === 23 || seq_num === 24
        
        const seqNumberWeekly =  seq_num === 1 || seq_num ===  2 || seq_num === 3 || seq_num ===4 || seq_num === 5 || seq_num === 6 || seq_num === 25
        if(seqNumber) {
            createDatesForMonthly(seq_num, startDate, endDate)
        } else if (seq_num === "jacobs_date"){
            createDatesForJacobsCalendar( startDate, endDate)
        } else if(seq_num === "custom_date") {
            CreateDateForCustomCalendar()
        } else if(seqNumberWeekly) {
            createWeeklyDate(startDate, endDate)
        }
        
    }
    const createWeeklyDate  = (startDate, endDate) =>{
            var now = new Date(startDate), dates = [];
            let arrayOfDate, dateArrayObject = [];
            var date = new Date(startDate);
            var start=new Date(startDate);
            var end=new Date(endDate);
            var now = date.getDay();
            var BillingDay='monday';
            var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var day = days.indexOf(BillingDay.toLowerCase());
            var diff = day - now;
            var Difference_In_Time = end.getTime() - start.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            var weekscount=Math.floor(Difference_In_Days/7);
            console.log(diff)
            for(var k=0;k<weekscount;k++)
            {
            if(diff==0)
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            
            }
            if(diff==-1)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            console.log(start.getDate(),start.getDate()+5);
            start.setDate(start.getDate() + 6);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            
            }
            console.log(diff)
            
            }
            if(diff==1)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            console.log(start.getDate(),start.getDate());
            start.setDate(start.getDate() +1);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            }
            if(diff==-2)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            console.log(start.getDate(),start.getDate()+4);
            start.setDate(start.getDate() +5);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            }
            if(diff==2)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +2);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            }
            if(diff==-3)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +4);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            }
            if(diff==3)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +3);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            }
            if(diff==-4)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +3);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            }
            if(diff==4)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +4);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            } if(diff==-5)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +4);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            
            }
            
            if(diff==5)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +5);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            
            }
            if(diff==-6)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +5);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            
            }
            if(diff==6)
            {
            if(k==0)
            {
            dateArrayObject.push(start.getDate()-1,start.getDate()-1)
            dateArrayObject.push (start.getDate(),start.getDate()+5)
            start.setDate(start.getDate() +6);
                       start.setDate(start.getDate() + 7);
            }
            else
            {
            
            if(start.getDate()+6<end.getDate())
            {
            dateArrayObject.push(start,start+6) ;
                       start.setDate(start.getDate() + 7);
            }
            }
            
            }
            }
            var weekscount=Difference_In_Days%7;
            if(weekscount!=0)
            console.log("dateArrayObject", dateArrayObject);
            console.log(dateArrayObject)
            
            return start;
    
            
    }
    const CreateDateForCustomCalendar = () => {
   
    }
    const createDatesForJacobsCalendar = (startDate, endDate) =>{
        const Dates = {
            startDate: format(startDate,'dd/MM/yyyy'),
            endDate: format(endDate,'dd/MM/yyyy')
        }
        
       dispatch(billingThroughDateJacobsAction(Dates))

    }
    const getBillThroughDate = (seq_num, m, y) => {
        let BTDate = new Date();
        let days = new Date(m, y, 0).getDate();
        let fridays = [6 - (new Date(m + '/01/' + y).getDay())];
        for (let i = fridays[0] + 7; i <= days; i += 7) {
            fridays.push(i);
        }
        fridays = fridays.filter(x => x != 0);        
        switch (seq_num) {
            case 13:
            case 18:
            case 23:
                BTDate = new Date(m + '-' + fridays[0] + '-' + y).toDateString();
                break;
            case 14:
            case 19:
                BTDate = new Date(m + '-' + fridays[1] + '-' + y).toDateString();
                break;
            case 15:
            case 20:    
                BTDate = new Date(m + '-' + fridays[2] + '-' + y).toDateString();
                break;
            case 16:
            case 21:
                BTDate = new Date(m + '-' + fridays[3] + '-' + y).toDateString();
                break;
            case 17:
            case 22:
            case 24:
                let date = fridays.length == 5 ? fridays[4] : fridays[3];
                BTDate = new Date(m + '-' + date + '-' + y).toDateString();
                break;
            default:
            // code block
        }
        return BTDate;
    }
    const createDatesForMonthly = (seq_num, startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let arrayOfDate, dateArrayObject = [];
        while (start < end) {
            
           let newStartDate = start;
            let addMonth;
            if(billingFrequency === 'Monthly'){
                addMonth = 60 * 60 * 24 * 1000 * 30;
            }
            else if(billingFrequency === 'Bi Monthly' ){
                addMonth = 60 * 60 * 24 * 1000 * 60;
            }
            else if(billingFrequency === 'Quarterly' ){
                addMonth = 60 * 60 * 24 * 1000 * 90;
            }
            let newDate = new Date(newStartDate.getTime() + addMonth);
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            let billThroughDate = new Date(getBillThroughDate(seq_num, month, year));
            billThroughDate = (billThroughDate >= end) ? end : billThroughDate
            arrayOfDate = {
                BILLING_START_DATE: format(new Date(newStartDate), 'dd-MMM-yyyy'),
                BILL_THROUGH_DATE: format(new Date(billThroughDate), 'dd-MMM-yyyy'),
                BILLING_PERIOD_NAME: periodName(newStartDate,billThroughDate),
                BILLING_TYPE: billingFrequency,
                ADDED_DATE: format(new Date(), 'dd-MMM-yyyy'),
                ADDED_BY: "",
                UPDATED_DATE: format(new Date(), 'dd-MMM-yyyy'),
                UPDATED_BY: "",
            };
            dateArrayObject.push(arrayOfDate);
            newStartDate = new Date(billThroughDate);
            newStartDate.setDate(newStartDate.getDate() + 1)
            start = new Date(newStartDate);
            setRowsData(dateArrayObject)
        }
    }
    const periodName = (newStartDate,billThroughDate) => {
        if(billingFrequency === 'Monthly'){
            return format(new Date(newStartDate), 'MMMM,yyyy') 
        }
        else if(billingFrequency === 'Bi Monthly'){
            const biMonthlyDate = (format(new Date(newStartDate), 'MMMM,yyyy'))+' - '+(format(new Date(billThroughDate), 'MMMM,yyyy'))
            return biMonthlyDate
        } else if(billingFrequency === 'Quarterly'){
            return "Q1"
        }
       
        else {
            return format(new Date(newStartDate), 'MMMM,yyyy')
        }              
    }
    const createDateForWeekly = (startDate,endDate,BillingDay) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let arrayOfDate, dateArrayObject = [];
        while (start < end) {
          var date = start;
          var now = date.getDay();
          var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          var day = days.indexOf(BillingDay.toLowerCase());
          var diff = day - now;
          var Difference_In_Time = end.getTime() - start.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          var weekscount = Math.floor(Difference_In_Days / 7);
          for (var k = 0; k < weekscount; k++) {
            if (diff == 0) {
              var date = new Date(start);
              date.setDate(date.addDays(6));
              dateArrayObject.push(start, date)
              start.setDate(date.addDays(7));
            }
            if (diff == -1) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(date.addDays(-1), date.addDays(-1))
                date = new Date(start);
                date.setDate(date.addDays(5));
                dateArrayObject.push(start, date);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == 1) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(date, date)
                date = new Date(start);
                start.setDate(date.addDays(1));
                date.setDate(date.addDays(6));
                dateArrayObject.push(start, date);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == -2) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(4))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(5));
                dateArrayObject.push(enddate, start);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == 2) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(1))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(2));
                dateArrayObject.push(start, enddate.addDays(1));
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == -3) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(3))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(4));
                dateArrayObject.push(enddate, start);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == 3) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(2))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(3));
                dateArrayObject.push(start, enddate.addDays(6));
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == -4) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(2))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(3));
                dateArrayObject.push(enddate, start);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == 4) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(3))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(4));
                dateArrayObject.push(start, enddate.addDays(6));
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == -5) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(3))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(4));
                dateArrayObject.push(enddate, start);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == 5) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(4))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(5));
                dateArrayObject.push(start, enddate.addDays(6));
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == -6) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(4))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(5));
                dateArrayObject.push(enddate, start);
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
            if (diff == 6) {
              if (k == 0) {
                var date = new Date(start);
                dateArrayObject.push(start, date.addDays(5))
                date = new Date(start);
                var enddate = new Date(start);
                start.setDate(date.addDays(6));
                dateArrayObject.push(start, enddate.addDays(6));
                date = new Date(start);
                start.setDate(date.addDays(6));
              }
              else {
                var date = new Date(start);
                date.setDate(date.addDays(6));
                if (date < end) {
                  dateArrayObject.push(start, date);
                  start.setDate(date.addDays(7));
                }
              }
            }
          }
        var weekscount = Difference_In_Days % 7;
          if (weekscount != 0)
            dateArrayObject.push(start, end)
            console.log("dateArrayObject",dateArrayObject)
          return dateArrayObject;
        }
        const addDays = (days) => {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
          }
    }

    const onSave = async () =>{
      const id = await getUniqueIdFromApi('/GetBillingPeriodSeq', 'biP_ID')
        const rowBillingDates = [...rowsData].map((d, i) => ({ ...d,BIP_ID: id+(i+1), COLLECTION_ID: collectionId, tableRowId: generateRandomString(),SAVE_MODE: 'I', level: 1 }))
        onSaveOptions(rowBillingDates,'billing_dates')
        onClose()
    }
    const setCustomDate = (customDate) => {
       setCustomDatePicker(false)
      }
      
   const onCloseCalendar = () =>{
    setCustomDatePicker(false)
}
    const disabled = !start || !end || !billingFrequency || !billThrough

    return (
        <Modal onClose={onClose} open={open} >
            <Box sx={style}>
                <Header>
                    <ModalTitle data-testid='setup-default-bill-period'>
                        Setup Default Bill Period
                    </ModalTitle>
                    <div onClick={onClose}>
                        <Icon name="close" />
                    </div>

                </Header>
                <Grid container >
                    <Grid item xs={12} lg={3} p={3}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <LabelComponent title="Billing Frequency" lg="12">
                                <Select displayEmpty fullWidth value={billingFrequency} onChange={e => onBillingFrequency(e)} size="small">
                                    {allBillingFrequency.map((d, i) => (
                                        <MenuItem key={d.SEQ_NUM} value={d.FREQUENCY_NAME}>
                                            {d.FREQUENCY_NAME}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </LabelComponent>
                            <Grid item xs={12} mt={2}>
                                <Label>Billing Start date</Label>
                                <DesktopDatePicker
                                inputFormat="dd-MMM-yyyy"
                                    value={start}
                                    onChange={(val) => onDateChange(val, 'start')}
                                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                                />
                            </Grid>
                            <LabelComponent title="Bill Through date" lg="12" mt={2}>
                                <Select displayEmpty fullWidth value={billThrough} onChange={e => onBillThroughDateChange(e)} size="small">
                                    {allBillingThroughDate.map((d, i) => (
                                        <MenuItem key={i} value={d.SEQ_NUM}>
                                            {d.BILL_THROUGH}
                                        </MenuItem>
                                    ))}

                                    {(billingFrequency === 'Monthly' || billingFrequency === 'Bi Monthly') && staticCalendarDate.map((d, i) => (
                                        <MenuItem key={i} value={d.SEQ_NUM}>
                                        {d.BILL_THROUGH}
                                    </MenuItem>
                                    ))}

                                </Select>
                            </LabelComponent>
                            {customDatePicker && (
                                <Grid item xs={12} >
                                    <CustomDate onCloseCalendar ={onCloseCalendar} setCustomDate={(d) => setCustomDate(d)}/>
                                </Grid>
                            )}
                            
                            <Grid item xs={12} mt={2}>
                                <Label>Billing End date</Label>
                                <DesktopDatePicker
                                inputFormat="dd-MMM-yyyy"
                                    minDate={start}
                                    value={end}
                                    onChange={(val) => onDateChange(val, 'end')}
                                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                                />
                            </Grid>

                            <Grid item xs={12} mt={2}>
                                <Button onClick={previewBillingPeriod} type="submit" variant="contained" disabled={disabled}>
                                    Preview Billing Periods
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                    {displayBillPreview && (
                        <Grid item sm={12} xs={12} md={9} lg={9} mt={3}>
                            <Stack >
                                <div style={{ fontSize: 14 }} >Preview Bill Period ({rowsData.length})</div>
                                <DataGrid rowHeight={40} headerRowHeight={60} columns={columnsData} rows={rowsData} style={{height: 'calc(80vh*(9/13))' }} />
                            </Stack>
                        </Grid>
                    )}

                </Grid>

                <Footer>
                    <Stack
                        width="100%"
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSave} disabled={!displayBillPreview} variant="contained">
                            Save
                        </Button>
                        {/* disabled={disabled}  */}
                    </Stack>
                </Footer>
            </Box>
        </Modal>
    );
}

export default SetupBilling;

const LabelComponent = ({ children, title, xs = 12, sm = 12, md = 6, lg = 6 }) => (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} >
        <FormControl fullWidth >
            <Label>{title}</Label>
            {children}
        </FormControl>
    </Grid>
)
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FDFDFD",
    boxShadow: 24,
    borderRadius: "6px",
};

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

const Footer = styled("div")({
    padding: "1.2em 1.5em",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    height: 70,
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    borderTop: "1px solid #E1E1E1",
    width: "100%",
});

const TableContent = styled("div")({
    height: "calc(85vh - 80px - 3em)",
    overflow: "auto",
});

const Label = styled("label")({
    fontSize: "14px",
    lineHeight: "24px",
    marginBottom: "10px",
    fontWeight: 400,
});
const Input = styled("input")({
    marginTop: 5,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "40px",
    width: "100%",

})

import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const getStringDay =(number)=> {
    switch (number){
        case 0 : return 'ВС';
        case 1 : return 'Пн';
        case 2 : return 'Вт';
        case 3 : return 'Ср';
        case 4 : return 'Чт';
        case 5 : return 'Пн';
        case 6 : return 'Сб';
    }
}

const filteredTimeArr =(dateArr)=> {
    let timeNow = new Date().getHours()
    return dateArr[0].freeTime.filter((date) => Number.parseInt(date) > timeNow )
}

const buildCalendar = () => {
    const dateArr = []

    const startDay = new Date()

    for(let i = 0; i < 30; i++ ){
        let day
        if (i === 0) {
            day = getStringDay( new Date(startDay.setDate(startDay.getDate())).getDay())
        }else {
            day = getStringDay( new Date(startDay.setDate(startDay.getDate()+1)).getDay())
        }

        let date = new Date(startDay.setDate(startDay.getDate())).getDate()
        let month = new Date(startDay.setDate(startDay.getDate())).getMonth()
        let fullDate = startDay.getTime()

        dateArr.push({
            date,
            day,
            month: month + 1,
            monthString: getStringMonth( month + 1),
            fullDate,

            freeTime: Array(18).fill(0).map((el, indx) =>{
                let base = 30 * indx
                if (indx < 1){
                    return '9:00'
                } else{
                    let res = (540 + base)/60
                    return (res ^ 0) === res ? `${res+':00'}`: `${Math.floor(res)+':30'}`
                }
            })
        })
    }
    dateArr[0].freeTime = filteredTimeArr(dateArr);
    return dateArr;
}
const getStringMonth = (number)=> {
    switch (number){
        default : return 'января';
        case 1 : return 'февраля';
        case 2 : return 'марта';
        case 3 : return 'апреля';
        case 4 : return 'мая';
        case 5 : return 'июня';
        case 6 : return 'июля';
        case 7: return 'августа';
        case 8 : return 'сентября';
        case 9 : return 'октября';
        case 10 : return 'ноября';
        case 11: return 'декабря';
    }
}
export const getDataFromDb = createAsyncThunk(
    'calendar/getDataFromDb',
    async (arg,{dispatch})=> {
        return await fetch('https://appointment-to-the-doctor-default-rtdb.europe-west1.firebasedatabase.app/meetDate.json')
            .then(res => res.json())
    }
)


export const rootReducer = createSlice({
    name: 'calendar',
    initialState: {
        arrDate: [],
        selectedDay: null,
        status: ''
    },
    reducers: {
        setArrDates: (state) => {
            state.arrDate = buildCalendar()
        },
        selectDay: (state,action) => {
            state.selectedDay = action.payload

        },
        selectDayTime: (state,action) => {
            state.selectedDay.meetTime = action.payload
        },
        postDateToDb: (state) => {
            axios.put('https://appointment-to-the-doctor-default-rtdb.europe-west1.firebasedatabase.app/meetDate.json',state.selectedDay)
                .then()
                .catch(err => console.log(err))
        }

    },
    extraReducers: {
        [getDataFromDb.pending] : (state) => {
            state.status = 'loading'
        },
        [getDataFromDb.fulfilled] : (state, {payload}) => {
            state.selectedDay = payload
        }
    }
})
export const getArrDates = state =>  state.calendar.arrDate
export const getSelectDay = state =>  state.calendar.selectedDay

export const { setArrDates, selectDay ,selectDayTime, postDateToDb, getDateFromDb} = rootReducer.actions

export default rootReducer.reducer
import './Calendar.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {IonSlides, IonSlide} from '@ionic/react'
import {setArrDates , selectDay, selectDayTime, getArrDates,getSelectDay} from '../../store/rootReducer'


function Calendar(){
    const arrDate = useSelector(getArrDates)
    const selectedDay = useSelector(getSelectDay)
    const dispatch = useDispatch()
    const slideOpts = {
        slidesPerView: 4,
        initialSlide: 0,
        speed: 400,
    };
    useEffect(() => {
        dispatch(setArrDates())
    }, []);

    return(
        <div className="visit-calendar">
            <div className="visit-calendar__header">
                <div className="header-title">Возможная дата</div>
                <div className="switch-button">
                    <button className="switch-button__icon">
                    <ion-icon name="calendar-outline"></ion-icon>
                    </button>
                    
                    <button className="switch-button__icon">
                    <ion-icon className="calendar-outline"></ion-icon>
                    </button>
                </div>
            </div>
            <IonSlides pager={false} options={slideOpts}>
                {
                    arrDate.map((el, indx)=>{
                        return (
                            <IonSlide key={indx}>
                                <div className="calendar-day" onClick={()=>dispatch(selectDay(el))}>
                                    <div className="name-of-day">{el.day}</div>
                                    <div className="day-number">{el.date}</div>
                                </div>
                            </IonSlide>
                        )
                    })
                }

            </IonSlides>
            <div className="header-title">Свободное время</div>
            {selectedDay ?
                selectedDay.freeTime.length > 1 ?
                    <IonSlides options={slideOpts} >
                        {

                            selectedDay.freeTime.map((el, indx) => {
                                return (
                                    <IonSlide update key={indx} onClick={()=>dispatch(selectDayTime(el))}>
                                        <div className="calendar-day">
                                            <div className="name-of-day">{el}</div>
                                        </div>
                                    </IonSlide>
                                )
                            })
                        }
                    </IonSlides>
                    : null
                : null
            }
        </div>
    )
}

export default Calendar
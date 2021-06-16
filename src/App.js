import './App.css'
import React, {useEffect} from 'react';
import img from './images/man.svg'
import '@ionic/react/css/ionic.bundle.css'
import {IonApp , IonContent, IonButton} from '@ionic/react'
import Calendar from "./components/Calendar/Calendar";
import {getSelectDay, postDateToDb, getDataFromDb } from './store/rootReducer'
import {useSelector, useDispatch} from "react-redux";



function App() {
  const selectedDay = useSelector(getSelectDay)
  const dispatch = useDispatch()

     useEffect(()=>{
            dispatch(getDataFromDb())
    },[dispatch])
    console.log(selectedDay)
  return (
    <IonApp>
      <IonContent >
            <div className="doctor-card">
                <h2 className="doctor-card__title">Алексей Керчинский</h2>
                <div className="doctor-card__info">
                    <img className="info__img" 
                        src={img} 
                        alt="doctor pic"/>
                    <div className="info__description">
                        Длительность консультации
                        <span>50 минут</span>
                    </div>
                </div>
            </div>
          <Calendar/>
          {selectedDay ?
          <div className="registration-to-meet">

                  <div className="registration-date">
                      <div className="date">
                          <p>Дата</p>
                          <div className="date-text">{selectedDay.date +' '+ selectedDay.monthString}</div>
                      </div>
                      <div className="time">
                          <p>Время</p>
                          <div className="time-text">{selectedDay.meetTime}</div>
                      </div>
                  </div>
              <IonButton disabled={!selectedDay.meetTime}
                         class='btn' expand="block"
                         color="secondary"
                         onClick={()=> dispatch(postDateToDb())}
              >ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ</IonButton>
          </div>
              : null
          }
      </IonContent>
    </IonApp>
  );
}

export default App;

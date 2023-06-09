//Vitest = framework de testes com mesmo propósito do Jest, porém já suporta ESM, TypeScript e JSX
//Jest compatible
import {expect, test} from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

test('create an appointment', () => {
    const startsAt = getFutureDate('2023-08-10');
    const endsAt = getFutureDate('2023-08-11');
    
    const appointment = new Appointment({
        customer: 'Anna Carolina',
        startsAt,
        endsAt,
    })

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual('Anna Carolina');
});

test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2023-08-10');
    const endsAt = getFutureDate('2023-08-09');

    expect(()=>{
        return new Appointment({
            customer: 'Anna Carolina',
            startsAt,
            endsAt
        })
    }).toThrow()

});

test('cannot create an appointment with startDate before now', () => {
    const startsAt = new Date(); 
    const endsAt = new Date(); 
    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() +  3); 

    expect(()=>{
        return new Appointment({
            customer: 'Anna Carolina',
            startsAt,
            endsAt
        })
    }).toThrow()

})
import {describe, it, expect} from 'vitest';
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment';


describe('Create appointment', () => {
    it('should be able to create an appointment', ()=>{
        const startsAt = getFutureDate('2023-08-10');
        const endsAt = getFutureDate('2023-08-11');

        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        );

        expect(createAppointment.execute({
            customer: 'Anna Carolina',
            startsAt,
            endsAt,
        })).resolves.toBeInstanceOf(Appointment)
    });

    it('should not be able to create an appointment with overlapping dates', async ()=>{
        const startsAt = getFutureDate('2023-08-10');
        const endsAt = getFutureDate('2023-08-15');

        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        );

        await createAppointment.execute({
            customer: 'Anna Carolina',
            startsAt,
            endsAt,
        })

        expect(createAppointment.execute({
            customer: 'Anna Carolina',
            startsAt: getFutureDate('2023-08-14'),
            endsAt: getFutureDate('2023-08-18')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'Anna Carolina',
            startsAt: getFutureDate('2023-08-08'),
            endsAt: getFutureDate('2023-08-12')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'Anna Carolina',
            startsAt: getFutureDate('2023-08-08'),
            endsAt: getFutureDate('2023-08-17')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'Anna Carolina',
            startsAt: getFutureDate('2023-08-11'),
            endsAt: getFutureDate('2023-08-12')
        })).rejects.toBeInstanceOf(Error)
    })

})
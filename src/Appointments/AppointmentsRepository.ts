import Appointment from '../models/Appointment'
import {isEqual} from 'date-fns'

//DTO: Data transfer object

interface createAppointmentDTO{
  provider: string;
  date: Date;
}

class ApointmentsRepository {
 private appointments: Appointment[]

  constructor(){
    this.appointments = []
  }

  // método que retorna todos os agendamentos
  public all(): Appointment[]{
    return this.appointments
  }

  //métodod que pega os agendamentos e verifica se a data é igual
  public findByDate(date: Date): Appointment | null{
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null
  }

  //método que cria um agendamento através da instancia e parametros dela, e envia essa instancia
  //para o constructor
  public create({provider, date}: createAppointmentDTO): Appointment{
    const appointment = new Appointment({provider, date})

    this.appointments.push(appointment)

    return appointment
  }
}

export default ApointmentsRepository

import Appointment from '../models/Appointment'
import {startOfHour} from 'date-fns'
import AppointmentsRepository from '../Appointments/AppointmentsRepository'

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  //cria a variavel appointmentsRepository que tem o tipo instancia AppointmentsRepository
  private appointmentsRepository: AppointmentsRepository

  //o constructor recebe o repositório como parametro e armazena no this.appointmentsRepository
  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository
  }

  //método que executa as regras de negócio
  public execute({provider, date}: Request): Appointment{

    //seta a hora
    const appointmentDate = startOfHour(date)

  //armazena o resultado da busca por método na variavel
  const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

  //se a data do novo agendamento já existe, retorna um erro falando que já tem um agendamento
  if(findAppointmentInSameDate){
    throw Error('Appointment already booked')
  }

  //método que cria um novo agendamento
  const appointment = this.appointmentsRepository.create({
    provider,
    date: appointmentDate
  })

  return appointment
  }
}

export default CreateAppointmentService

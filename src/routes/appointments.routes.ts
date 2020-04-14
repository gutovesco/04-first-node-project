import {Router} from 'express'
import {startOfHour, parseISO} from 'date-fns'
import AppointmentsRepository from '../Appointments/AppointmentsRepository'

const appointmentsRouter = Router()

//instância que contem os métodos de listagem e criação de agendamentos
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  //chama o método que lista todos os agendamentos
  const appointments = appointmentsRepository.all()

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  const {provider, date} = request.body

  //a data é convertido para o formato ISO
  const parsedDate = startOfHour(parseISO(date))

  //armazena o resultado da busca por método na variavel
  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)

  //se a data do novo agendamento já existe, retorna um erro falando que já tem um agendamento
  if(findAppointmentInSameDate){
    return response
    .status(400)
    .json({message: 'Appointment already booked'})
  }

  //método que cria um novo agendamento
  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter

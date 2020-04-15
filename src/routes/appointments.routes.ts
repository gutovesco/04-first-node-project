import {Router} from 'express'
import {parseISO, parse} from 'date-fns'
import AppointmentsRepository from '../Appointments/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

//instância que contem os métodos de listagem e criação de agendamentos
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  //chama o método que lista todos os agendamentos
  const appointments = appointmentsRepository.all()

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try{
  const {provider, date} = request.body

  //a data é convertido para o formato ISO
  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentsRepository)

  const appointment = createAppointment.execute({provider, date: parsedDate})

  return response.json(appointment)
  }
  catch(err){
    return response.status(400).json({error: err.message})
  }
})

export default appointmentsRouter

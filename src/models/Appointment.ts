import {uuid} from 'uuidv4'

class Appointment{
  id: string;

  provider: string;

  date: Date;

  //o constructor recebe o provider e o date e remove o id através do omit
  constructor({provider, date}: Omit<Appointment, 'id'>){
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment

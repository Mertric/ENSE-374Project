import { ToDoModel } from '../model/todo.model.';
import { EventModel } from '../model/event.model';


export function assemble(dto: ToDoModel): EventModel {
    // if(!dto){
    //     return;
    // }
    let toReturn: EventModel = null;
    toReturn.id = dto.todoId;
    toReturn.title = dto.titleOf;
    toReturn.description = dto.descriptionOf;
    toReturn.startTime = dto.startOf;
    toReturn.endTime = dto.endOf;
    toReturn.allday = false;
    return  toReturn;
}

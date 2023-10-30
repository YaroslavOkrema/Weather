import { TimeOfDaBgClass } from "../enums/enumForTimeOfDay";

export class FactoryClassTimeOfDay {
    private readonly currentHour: number;
    private timeOfDay: TimeOfDaBgClass;

    constructor() {
        this.currentHour = new Date().getHours();
        this.timeOfDay = this.setTimeOfDay();
    }
    
    getTimeOfDay(): TimeOfDaBgClass {
      return this.timeOfDay;
  }

    setTimeOfDay(): TimeOfDaBgClass {
        if (this.currentHour >= 6 && this.currentHour < 12) {
            return TimeOfDaBgClass.MORNING;
          } else if (this.currentHour >= 12 && this.currentHour < 18) {
            return TimeOfDaBgClass.DAY;
          } else if (this.currentHour >= 18 && this.currentHour < 22) {
            return TimeOfDaBgClass.EVENING;
          } else {
            return TimeOfDaBgClass.NIGHT;
          }
    }
  }
// @flow

type $CalendarComponentPropsWithState = {
  activeYear: number,
  activeMonth: number,
  daysToShow: $DaysToShow,
}

type $CalendarComponentPropsWithActions = $CalendarComponentPropsWithState & {
  setActiveDate: Function,
}

type $DayTileProps = {
  day: number,
  month: number,
  year: number,
}

type $DayTilePropsWithState = $DayTileProps & {
  hasSomeTasks: boolean,
  isToday: boolean,
  isActive: boolean,
  isAdditional: boolean,
}

type $DayTilePropsWithActions = $DayTilePropsWithState & {
 setActiveDate: Function,
}

type $TasksPropsWithState = {
  activeDay: number,
  tasks: $Task[],
  dayName: string,
}

type $TasksPropsWithActions = $TasksPropsWithState & {
  addNewTask: Function,
}

type $TaskProps = {
  task: $Task,
  index: number,
}

type $TaskPropsWithActions = $TaskProps & {
  updateTask: Function,
  deleteTask: Function,
  sortTasks: Function,
}

type $State = {
  activeDay: number,
  activeMonth: number,
  activeYear: number,
  tasks: $Tasks
}

type $Tasks = {
  [string]: {
    [string]: $Task[],
  },
}

type $Task = {
  content: string,
  time: number,
}

type $CalendarDaysKey = 'prev' | 'curr' | 'next'

type $DaysToShow = {
  [$CalendarDaysKey]: $DaysObject,
}

type $DaysObject = {
  from: number,
  amount: number,
}

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  Injectable,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {
  CalendarEvent, CalendarMonthViewDay,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../../../../node_modules/angular-calendar/dist/css/angular-calendar.css']
})


export class CalendarComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  titleEditorEnabled: boolean;
  editableTitle: String;

  ngOnInit() {
    this.titleEditorEnabled = false;

  }
  view: string = 'month';
  viewDate: Date = new Date();
  index: number;

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: this.colors.red,
      actions: this.actions
    }
  ];


  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>;

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() % 2 === 1 && day.inMonth) {
        day.cssClass = 'odd-cell';
      }
    });
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // Edit Event    
  titleEnableEditor(events) {
    this.titleEditorEnabled = true;
    this.editableTitle = events.title;

  };

  disableEditor() {
    this.titleEditorEnabled = false;
  };

  save(events) {
    this.disableEditor();
    events.title = this.editableTitle;
  };

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  deleteEventConfirm(event) {
    this.modal.open(this.modalDelete);
    this.index = this.events.indexOf(event);
  }

  deleteEvent() {
    this.events.splice(this.index, 1); 
    this.refresh.next();
    this.index = -1;
  }
}



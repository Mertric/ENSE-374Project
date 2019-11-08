import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventToDoPage } from './add-event-to-do.page';

describe('AddEventToDoPage', () => {
  let component: AddEventToDoPage;
  let fixture: ComponentFixture<AddEventToDoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventToDoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventToDoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMenualComponent } from './search-menual.component';

describe('SearchMenualComponent', () => {
  let component: SearchMenualComponent;
  let fixture: ComponentFixture<SearchMenualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMenualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMenualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

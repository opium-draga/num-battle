import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFinderPopupComponent } from './game-finder-popup.component';

describe('GameFinderPopupComponent', () => {
  let component: GameFinderPopupComponent;
  let fixture: ComponentFixture<GameFinderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFinderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFinderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SyntacticErrorPanel } from './syntactic-error-panel';

describe('SyntacticErrorPanel', () => {
  let component: SyntacticErrorPanel;
  let fixture: ComponentFixture<SyntacticErrorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyntacticErrorPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(SyntacticErrorPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

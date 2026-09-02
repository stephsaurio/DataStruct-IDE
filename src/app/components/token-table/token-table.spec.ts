import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTable } from './token-table';

describe('TokenTable', () => {
  let component: TokenTable;
  let fixture: ComponentFixture<TokenTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenTable],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

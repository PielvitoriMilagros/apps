import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalaCuartoAComponent } from './sala-cuarto-a.component';

describe('SalaCuartoAComponent', () => {
  let component: SalaCuartoAComponent;
  let fixture: ComponentFixture<SalaCuartoAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaCuartoAComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaCuartoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalaCuartoBComponent } from './sala-cuarto-b.component';

describe('SalaCuartoBComponent', () => {
  let component: SalaCuartoBComponent;
  let fixture: ComponentFixture<SalaCuartoBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaCuartoBComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaCuartoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

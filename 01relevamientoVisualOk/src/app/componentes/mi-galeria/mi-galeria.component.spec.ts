import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiGaleriaComponent } from './mi-galeria.component';

describe('MiGaleriaComponent', () => {
  let component: MiGaleriaComponent;
  let fixture: ComponentFixture<MiGaleriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiGaleriaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

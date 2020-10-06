import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirFotoLindaComponent } from './subir-foto-linda.component';

describe('SubirFotoLindaComponent', () => {
  let component: SubirFotoLindaComponent;
  let fixture: ComponentFixture<SubirFotoLindaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFotoLindaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFotoLindaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

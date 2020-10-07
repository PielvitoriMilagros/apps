import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirFotoFeaComponent } from './subir-foto-fea.component';

describe('SubirFotoFeaComponent', () => {
  let component: SubirFotoFeaComponent;
  let fixture: ComponentFixture<SubirFotoFeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFotoFeaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFotoFeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

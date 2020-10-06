import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirFotoLindaPage } from './subir-foto-linda.page';

describe('SubirFotoLindaPage', () => {
  let component: SubirFotoLindaPage;
  let fixture: ComponentFixture<SubirFotoLindaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFotoLindaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFotoLindaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

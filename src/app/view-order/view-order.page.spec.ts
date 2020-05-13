import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewOrderPageRoutingModule } from './view-order-routing.module';
import { ViewOrderPage } from './view-order.page';


describe('ViewOrderPage', () => {
  let component: ViewOrderPage;
  let fixture: ComponentFixture<ViewOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderPage ],
      imports: [IonicModule.forRoot(), ViewOrderPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

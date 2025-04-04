import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [LoginComponent],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should open login page on click', () => {
    const openLoginPageSpy = jest.spyOn(component, 'openLoginPage');
    const loginButton = fixture.debugElement.query(
      By.css('[data-testid="loginButton"]')
    );
    loginButton.triggerEventHandler('click', null);
    expect(openLoginPageSpy).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      jest.spyOn(component, 'checkTokenUrlCallback');
      component.ngOnInit();
      expect(component.checkTokenUrlCallback).toHaveBeenCalled();
    });
  });
});

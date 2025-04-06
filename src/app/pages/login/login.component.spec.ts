import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { SpotifyService } from '../../services/spotify.service';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockSpotifyService: jest.Mocked<SpotifyService>;

  beforeEach(() => {
    mockSpotifyService = {
      getLoginUrl: jest.fn().mockReturnValue('https://example.com/login'),
      getTokenUrlCallback: jest.fn(),
      defineAccessToken: jest.fn(),
    } as unknown as jest.Mocked<SpotifyService>;

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [LoginComponent],
      providers: [{ provide: SpotifyService, useValue: mockSpotifyService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should open login page on click', () => {
    jest.spyOn(component, 'openLoginPage');

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });

    const loginButton = fixture.debugElement.query(
      By.css('[data-testid="loginButton"]')
    );
    loginButton.triggerEventHandler('click', null);
    expect(component.openLoginPage).toHaveBeenCalled();
    expect(window.location.href).toBe('https://example.com/login');
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      jest.spyOn(component, 'checkTokenUrlCallback');
      component.ngOnInit();
      expect(component.checkTokenUrlCallback).toHaveBeenCalled();
    });
  });
});

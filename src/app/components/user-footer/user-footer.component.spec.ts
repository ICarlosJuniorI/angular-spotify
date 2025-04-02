import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserFooterComponent } from './user-footer.component';
import { SpotifyService } from '../../services/spotify.service';
import { By } from '@angular/platform-browser';

describe('UserFooterComponent', () => {
  let component: UserFooterComponent;
  let fixture: ComponentFixture<UserFooterComponent>;
  let mockSpotifyService: jest.Mocked<SpotifyService>;

  beforeEach(() => {
    mockSpotifyService = {
      user: { name: 'John Doe', imageUrl: 'http://example.com/john.jpg' },
      logout: jest.fn(),
    } as unknown as jest.Mocked<SpotifyService>;

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [UserFooterComponent],
      providers: [{ provide: SpotifyService, useValue: mockSpotifyService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFooterComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`exitIcon has default value`, () => {
    expect(component.exitIcon).toEqual(faSignOutAlt);
  });

  describe('ngOnInit', () => {
    it('should assign this.user a value', () => {
      component.ngOnInit();

      expect(component.user).toEqual(mockSpotifyService.user);
    });

    it('should logout', () => {
      const logoutSpy = jest.spyOn(component, 'logout');

      const iconElement = fixture.debugElement.query(
        By.css('[data-testid="logoutButton"]')
      );

      iconElement.triggerEventHandler('click', null);

      expect(logoutSpy).toHaveBeenCalled();
    });
  });
});

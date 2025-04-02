import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { LeftPanelComponent } from './left-panel.component';
import { SpotifyService } from '../../services/spotify.service';
import { of, Subscription } from 'rxjs';

describe('LeftPanelComponent', () => {
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;
  let mockSpotifyService: jest.Mocked<SpotifyService>;

  beforeEach(() => {
    const spotifyServiceMock = {
      getUserPlaylist: jest
        .fn()
        .mockReturnValue(of([{ id: '1', name: 'Playlist 1' }])),
    };

    mockSpotifyService =
      spotifyServiceMock as unknown as jest.Mocked<SpotifyService>;

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [LeftPanelComponent],
      providers: [{ provide: SpotifyService, useValue: mockSpotifyService }], // Substitui o SpotifyService pelo mockSpotifyService
    });

    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('selectedMenu has a default value', () => {
    expect(component.selectedMenu).toEqual('Home');
  });

  it('subs has a default value', () => {
    expect(component.subs).toEqual([]);
  });

  it('homeIcon has a default value', () => {
    expect(component.homeIcon).toEqual(faHome);
  });

  it('searchIcon has a default value', () => {
    expect(component.searchIcon).toEqual(faSearch);
  });

  it('artistIcon has a default value', () => {
    expect(component.artistIcon).toEqual(faGuitar);
  });

  it('playlistIcon has a default value', () => {
    expect(component.playlistIcon).toEqual(faMusic);
  });

  it('should update selectedMenu and navigate to the correct URL', () => {
    // Arrange: Spy on the router's navigateByUrl method
    const navigateByUrlSpy = jest.spyOn(component['router'], 'navigateByUrl');

    // Act: Call the clickButton method with a button value
    const buttonValue = 'Home';
    component.clickButton(buttonValue);

    // Assert: Verify that selectedMenu is updated
    expect(component.selectedMenu).toBe(buttonValue);

    // Assert: Verify that navigateByUrl was called with the correct URL
    expect(navigateByUrlSpy).toHaveBeenCalledWith('player/home');
  });

  describe('ngOnInit', () => {
    it('should make expected calls', () => {
      jest.spyOn(component, 'getPlaylists');
      component.ngOnInit();
      expect(component.getPlaylists).toHaveBeenCalled();
      expect(mockSpotifyService.getUserPlaylist).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', () => {
      // Arrange: Create mock subscriptions with a spy on the unsubscribe method
      const mockSubscription1 = {
        unsubscribe: jest.fn(),
      } as unknown as Subscription;
      const mockSubscription2 = {
        unsubscribe: jest.fn(),
      } as unknown as Subscription;

      // Add the mock subscriptions to the subs array
      component.subs.push(mockSubscription1, mockSubscription2);

      // Act: Call ngOnDestroy
      component.ngOnDestroy();

      // Assert: Verify that unsubscribe was called for each subscription
      expect(mockSubscription1.unsubscribe).toHaveBeenCalled();
      expect(mockSubscription2.unsubscribe).toHaveBeenCalled();
    });
  });
});

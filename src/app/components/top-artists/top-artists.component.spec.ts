import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TopArtistsComponent } from './top-artists.component';
import { newArtist } from '../../common/factories';
import { SpotifyService } from '../../services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';
import { of } from 'rxjs';

describe('TopArtistsComponent', () => {
  let component: TopArtistsComponent;
  let fixture: ComponentFixture<TopArtistsComponent>;
  let mockSpotifyService: jest.Mocked<SpotifyService>;

  beforeEach(() => {
    mockSpotifyService = {
      getTopArtists: jest.fn(),
    } as unknown as jest.Mocked<SpotifyService>;

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TopArtistsComponent],
      providers: [{ provide: SpotifyService, useValue: mockSpotifyService }],
    });

    fixture = TestBed.createComponent(TopArtistsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('artist has default value', () => {
    expect(component.artist()).toEqual(newArtist());
  });

  describe('ngOnInit', () => {
    it('should call getTopArtists', () => {
      const mockArtists: IArtist[] = [
        {
          id: '1',
          name: 'Artist 1',
          imageUrl: 'example.com/artist1.jpg',
        },
        {
          id: '2',
          name: 'Artist 2',
          imageUrl: 'example.com/artist2.jpg',
        },
      ];

      mockSpotifyService.getTopArtists.mockReturnValue(of(mockArtists));

      component.getArtists();

      expect(component.artist()).toEqual(mockArtists[0]);
    });
  });
});

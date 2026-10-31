import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens on the level path with level 1 selected', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Level 1 selected');
    expect(text).toContain('Tap a bright level to play it, or press Play.');
    expect(text).toContain('Cleared 0 of 5');
  });
});

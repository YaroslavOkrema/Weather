import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit{
  switchTheme = new FormControl(false);
  @HostBinding('class') className = '';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  constructor(private overlay: OverlayContainer) {}
  ngOnInit() {
    this. loadTheme();
  }
  ngAfterViewInit() {
    this.switchTheme.valueChanges.subscribe((currentMode) => {
      this.className = currentMode ? this.darkClass : this.lightClass;

      if (currentMode) {
        this.overlay.getContainerElement().classList.add(this.darkClass);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClass);
      }

      localStorage.setItem('theme', currentMode ? 'dark' : 'light');
    });
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.className = savedTheme === 'dark' ? this.darkClass : this.lightClass;

    if(savedTheme === 'dark') {
      this.switchTheme.patchValue(true);
    } else {
      this.switchTheme.patchValue(false);
    }
  }
}

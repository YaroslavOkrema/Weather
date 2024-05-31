import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WidgetComponent } from './widget/widget.component';
import {SidenavComponent} from "./sidenav/sidenav.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', redirectTo: 'weather', pathMatch: 'full'},
      { path: 'weather', component: WeatherComponent},
      { path: 'widget', component: WidgetComponent},
      { path: 'settings', component: SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

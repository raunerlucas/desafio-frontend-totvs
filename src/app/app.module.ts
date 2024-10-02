import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PoModule} from '@po-ui/ng-components';
import {HttpClientModule} from "@angular/common/http";
import {MainComponent} from "./components/main/main.component";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PoModule,
        MainComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

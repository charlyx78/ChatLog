import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/views/login/login.component';
import { HomeComponent } from './shared/views/home/home.component';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Environment } from './environments/environment';
import { SignUpComponent } from './shared/views/sign-up/sign-up.component';
import { NavbarComponent } from './shared/views/navbar/navbar.component';
import { SideMenuComponent } from './shared/views/side-menu/side-menu.component';
import { AccountComponent } from './shared/views/account/account.component';
import { ChatComponent } from './shared/views/chat/chat.component';
import { FriendsChatsComponent } from './shared/views/friends-chats/friends-chats.component';
import { FriendRequestButtonComponent } from './shared/views/friend-request-button/friend-request-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    NavbarComponent,
    SideMenuComponent,
    AccountComponent,
    ChatComponent,
    FriendsChatsComponent,
    FriendRequestButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    //Firebase
    AngularFireModule.initializeApp(Environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./shared/views/login/login.component";
import { SignUpComponent } from "./shared/views/sign-up/sign-up.component";

//array de configuracion de rutas
const appRoutes: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'SignUp', component: SignUpComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders <any> = RouterModule.forRoot(appRoutes);
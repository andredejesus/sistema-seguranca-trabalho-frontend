import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, 
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const autenticacao = this.authService.verificarAutenticacao();

      //Verifica se o token expirou, caso tenha expirado é encerrado a sessão e direcionado para tela de login.
      if(autenticacao){

        this.authService.encerrarSessao();
        this.router.navigateByUrl('/login')
        
        return false;

      }else if(!autenticacao){
        return true;
      }
  }
  
}

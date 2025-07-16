@echo off
setlocal enabledelayedexpansion

echo ========================================
echo LOGIN GIT COM TOKEN (GitHub - HTTPS)
echo ========================================
echo.

:: Solicita nome do usu�rio GitHub
set /p GITHUB_USER=Digite seu nome de usu�rio do GitHub: 

:: Solicita token do GitHub
set /p GITHUB_TOKEN=Digite seu token do GitHub (ser� usado como senha): 

:: Define user.name como o mesmo GitHub user
set GIT_NAME=%GITHUB_USER%

:: Monta o email padr�o do GitHub para privacidade
set GIT_EMAIL=%GITHUB_USER%@users.noreply.github.com

:: Configura identidade local do git
git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"

:: Pega a URL do origin configurada no reposit�rio atual
for /f "delims=" %%i in ('git remote get-url origin') do set URL=%%i

:: Remove o "https://" da URL para inserir as credenciais
set URLbase=!URL:https://=!

:: Monta a nova URL com usu�rio e token embutidos
set NOVA_URL=https://%GITHUB_USER%:%GITHUB_TOKEN%@!URLbase!

echo.
echo Tentando fazer push com autentica��o...
git push %NOVA_URL%

echo.
echo ========================================
echo ? Opera��o finalizada.
echo ========================================
pause

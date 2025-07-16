@echo off
setlocal enabledelayedexpansion

echo ========================================
echo LOGIN GIT COM TOKEN (GitHub - HTTPS)
echo ========================================
echo.

:: Solicita nome do usuário GitHub
set /p GITHUB_USER=Digite seu nome de usuário do GitHub: 

:: Solicita token do GitHub
set /p GITHUB_TOKEN=Digite seu token do GitHub (será usado como senha): 

:: Define user.name como o mesmo GitHub user
set GIT_NAME=%GITHUB_USER%

:: Monta o email padrão do GitHub para privacidade
set GIT_EMAIL=%GITHUB_USER%@users.noreply.github.com

:: Configura identidade local do git
git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"

:: Pega a URL do origin configurada no repositório atual
for /f "delims=" %%i in ('git remote get-url origin') do set URL=%%i

:: Remove o "https://" da URL para inserir as credenciais
set URLbase=!URL:https://=!

:: Monta a nova URL com usuário e token embutidos
set NOVA_URL=https://%GITHUB_USER%:%GITHUB_TOKEN%@!URLbase!

echo.
echo Tentando fazer push com autenticação...
git push %NOVA_URL%

echo.
echo ========================================
echo ? Operação finalizada.
echo ========================================
pause
